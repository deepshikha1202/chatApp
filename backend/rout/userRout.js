const express=require("express");
const isLogin = require("../DB/middleware/isLogin.js");
const { getUserBySearch, getChatters } = require("../routcontroller/userhandlercontroller.js");
const router=express.Router();

router.get('/search',isLogin,getUserBySearch)
router.get('/chatters',isLogin,getChatters)

module.exports = router;