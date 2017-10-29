var qs = document.querySelector.bind(document);

function displayUrl(sha) {
    qs('#short').textContent = 'https://url.to/#' + sha.slice(0, 8);
}

window.onload = function () {
    var logBranchName = 'log';
    var gh = new GitHub({
        username: 'd3pl0y3r',
        token: 'e4bea94193611c011989b92f0f8234cecbbac1b9'
    });
    var repo = gh.getRepo('zettamax/webrtc-ip-logger');

    qs('#submit').onclick = function () {
        qs('#short').textContent = '';
        var url = qs('#url').value;
        var filename = url.replace(/\//g, '|');
        var content = 'Time: ' + new Date();

        repo.listCommits({
            sha: logBranchName,
            path: filename
        }).then(function (r) {
            if (!r.data.length) {
                throw 'No file for given URL';
            }
            displayUrl(r.data[0].sha)
        }).catch(function () {
            repo.writeFile(logBranchName, filename, content, url, {encode: true}).then(function (r) {
                displayUrl(r.data.commit.sha);
            }).catch(function (e) {
                console.log(e);
            })
        });
    };
};