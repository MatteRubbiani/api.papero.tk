const dotenv = require("dotenv")
const request = require('request');

dotenv.config({path: "../config/config.env"})

let sitesToBeSynced = [
    "https://papero.tk/server/unseen"
]

let defaultEndpoint = "/sync"
//default is Post, body, {_from: ..., _to: ..., secret}
let secret = process.env.SYNC_SECRET

function sync(_from, _to){
    sitesToBeSynced.forEach(site => {
        let url = site + defaultEndpoint
        let body = JSON.toString({
            _from: _from,
            _to: _to,
            secret: secret
        })
        request.post({
            headers: {'content-type' : 'application/x-www-form-urlencoded'},
            url:     url,
            body:    body
        }, function(error, response, body){
            console.log(body);
        });
    })
}

module.exports = sync