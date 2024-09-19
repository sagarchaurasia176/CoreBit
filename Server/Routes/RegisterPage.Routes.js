const express = require('express')
const router = express.Router()
const {RegisterPage} = require('../controller/Register.Controller')
//Register Page applied there so we get !
router.post('/api/RegisterPage',RegisterPage);


module.exports = router