const express = require('express');
const router = express.Router()
const passport = require("passport")
const crypto = require("crypto");
const generateLocalName = require("../managers/localNameGenerator")
const sync = require("../managers/activateSyncManager")

const get_cookies = function(request) {
    let cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
        let parts = cookie.match(/(.*?)=(.*)$/)
        cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
};

// /auth/google

router.get("/google",
    (req, res)=> {
        res.cookie("from_location", req.query.from_location, {path: "/"})
        res.redirect("http://papero.me/auth/google/pass")
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
        let cookies = get_cookies(req)
        let googleLoggedIn = cookies["googleLoggedIn"]
        if (googleLoggedIn === false || googleLoggedIn === "false"){
            console.log("syync")
            sync(cookies["userId"].toString(), req.user.id.toString())

        }
        res.cookie('username', req.user.firstName, { maxAge: 2592000000 * 12});
        res.cookie('userId', req.user.id, { maxAge: 2592000000 * 12});
        res.cookie('googleLoggedIn', true, { maxAge: 2592000000 * 12});
        res.redirect(decodeURIComponent(get_cookies(req)['from_location']))
    }
)

//LOCAL
router.get(
    "/local",
    (req, res) =>{
        req.logout()
        let localName = generateLocalName()
        let id = crypto.randomBytes(20).toString('hex');
        res.cookie('username', localName, { maxAge: 2592000000 * 12});
        res.cookie('userId', id, { maxAge: 2592000000 * 12});
        res.cookie('googleLoggedIn', false, { maxAge: 2592000000 * 12});
        res.send({username: localName})
    }
)

//logout
router.get("/logout", (req, res) =>{
    req.logout()
    let cookies = get_cookies(req)
    for (let key in cookies){
        res.cookie(key, "",{maxAge: 0})
    }
    res.redirect("/")
})


module.exports = router;
