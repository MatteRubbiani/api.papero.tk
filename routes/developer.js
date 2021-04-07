const express = require('express');
const router = express.Router()
const token = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYxNzgyMDEwNCwiaWF0IjoxNjE3ODIwMTA0fQ.NercB9qr1qr3qNiKHXB9rPFxosYLnZMA5bbFtjD8jpE"

router.get("/login", (req, res) =>{
    res.cookie('developer-token', req.user.firstName, { maxAge: 2592000000 * 12});
    res.send("you are now a papero developer")
})

module.exports = router;
