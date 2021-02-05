const express = require('express');
const router = express.Router()
const passport = require("passport")

const get_cookies = function(request) {
    let cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        let parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};
router.get("/test", (req, res) => {
    res.cookie("from_location", "aaaaa")
    res.send()
})
// /auth/google
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile"] }),
    (req, res)=>{
        res.cookie("from_location", req.query.from_location)
        //res.cookie("from_location","teeest")
        res.send()
    }
)



// callback
router.get(
    "/google/callback",
    passport.authenticate("google", {failureRedirect : "/"}),
    (req, res) =>{
        res.send({"from": get_cookies(req)['from_location']})
        //res.send(get_cookies(req)['from_location'])
        //res.redirect(decodeURI(get_cookies(req)['from_location']))
    }
)

//logout
router.get("/logout", (req, res) =>{
    req.logout()
    res.redirect("/")
})

module.exports = router;
