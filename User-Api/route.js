const Express=require('express')

const router=Express.Router();

const users=require('./contoller')



router.post('/signup',users.signup);

router.post('/login',users.login)


module.exports=router



