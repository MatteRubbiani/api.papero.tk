const dotenv = require("dotenv")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

dotenv.config({path: "../config/config.env"})

let sitesToBeSynced = [
    "https://papero.me/server/unseen/games"
]

let defaultEndpoint = "/sync"
//default is Post, body, {_from: ..., _to: ..., secret}
let secret = process.env.SYNC_SECRET

function sync(_from, _to, _username){
    sitesToBeSynced.forEach(site => {
        let url = site + defaultEndpoint
        let data = {
            _from: _from,
            _to: _to,
            username: _username,
            secret: secret
        };

        let json = JSON.stringify(data);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(json);

    })
}

module.exports = sync