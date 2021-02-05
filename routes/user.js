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
    res.send({name: req.user.firstName})
})

module.exports = router;