const express = require('express');
const router = express.Router()

router.get("/", (req, res) =>{
  res.send({name: req.user.firstName})
})

module.exports = router;
