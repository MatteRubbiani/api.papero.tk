const express = require('express');
const router = express.Router()

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