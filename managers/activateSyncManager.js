const dotenv = require("dotenv")
const request = require('request');

dotenv.config({path: "../config/config.env"})

let sitesToBeSynced = [
    "https://papero.tk/server/unseen/games"
]

let defaultEndpoint = "/sync"
//default is Post, body, {_from: ..., _to: ..., secret}
let secret = process.env.SYNC_SECRET

function sync(_from, _to){
    sitesToBeSynced.forEach(site => {
        let url = site + defaultEndpoint
        let data = {
            _from: _from,
            _to: _to,
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