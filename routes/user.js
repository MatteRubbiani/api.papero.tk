const express = require('express');
const router = express.Router()

const get_cookies = function(request) {
    let cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        let parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};

router.get("/get_info", (req, res) =>{
    let googleSignedIn = false
    if (req.user) googleSignedIn = true //...
    let username
    if (!req.user) {
        username = get_cookies(req)["username"]
        let cookies = get_cookies(req)
        console.log(cookies["googleLoggedIn"])
        if (cookies["googleLoggedIn"]){
            let cookies = get_cookies(req)
            for (let key in cookies){
                res.cookie(key, "",{maxAge: 0})
            }
        }
    }else{
        username = req.user.firstName
    }
    if (!username) {
        res.send(null)

        return null
    }
    res.send({
        username: username,
        google_signed_in: googleSignedIn
    })
})

module.exports = router;