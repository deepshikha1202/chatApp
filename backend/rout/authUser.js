const { userRegister,userLogin, userLogout } =require( "../routcontroller/userroutcontroller.js");

const express=require("express");
const router=express.Router();

router.post('/register',userRegister);
router.post('/login',userLogin);
router.post('/logout',userLogout);

module.exports = router;