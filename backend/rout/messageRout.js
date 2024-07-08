const express = require("express");
const { sendMessage, getMessage} = require("../routcontroller/messageroutcontroller.js");
const isLogin = require("../DB/middleware/isLogin.js");

const router = express.Router();

router.post('/send/:id',isLogin,sendMessage)
router.get('/:id',isLogin,getMessage)


module.exports = router;
