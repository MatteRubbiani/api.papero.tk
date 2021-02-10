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
    let googleSignedIn = true
    if (req.user) googleSignedIn = true //...
    if (!req.user) {
        res.send(null)
        return null
    }

    res.send({
        username: req.user.firstName,
        google_signed_in: googleSignedIn
    })
})

module.exports = router;