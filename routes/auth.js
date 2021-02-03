const express = require('express');
const router = express.Router()
const passport = require("passport")

// /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

// callback
router.get(
    "/google/callback",
    passport.authenticate("google", {failureRedirect : "/"}),
    (req, res) =>{
        res.redirect("http://papero.tk")
    }
)

//logout
router.get("/logout", (req, res) =>{
    req.logout()
    res.redirect("/")
})

module.exports = router;
