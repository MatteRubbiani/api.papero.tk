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
    res.cookie("from_location", "aaaaa", {path: "/"})
    res.send()
})
// /auth/google
router.get(
    "/google",
    (req, res)=> {
        //res.cookie("from_location", req.query.from_location)
        res.cookie("from_location", req.query.from_location, {path: "/"})
        res.redirect("http://papero.tk/auth/google/pass")
    }
)

router.get(
    "/google/pass",
    passport.authenticate("google", { scope: ["profile"] })
)

// callback
router.get(
    "/google/callback",
    passport.authenticate("google", {failureRedirect : "/"}),
    (req, res) =>{
        //res.send(req.cookies)
        //res.send(get_cookies(req)['from_location'])
        //res.send(decodeURIComponent(get_cookies(req)['from_location']))
        res.cookie('userid', req.user.id, { maxAge: 2592000000 * 12 });
        res.redirect(decodeURIComponent(get_cookies(req)['from_location']))
    }
)

//logout
router.get("/logout", (req, res) =>{
    req.logout()
    res.redirect("/")
})

module.exports = router;
