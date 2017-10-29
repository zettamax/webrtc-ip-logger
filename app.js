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
                + r.data.commit.sha +'/comments';
            var data = {
                "body": "Great stuff"
            };

            repo._request('POST', url, data).then(function (r) {
                location = r.data.commit.message;
            });
        }).catch(function () {
            location = 'https://google.com';
        });
    } else {
        location = 'https://google.com';
    }
};