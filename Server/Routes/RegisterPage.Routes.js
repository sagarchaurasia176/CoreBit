const express = require("express");
const router = express.Router();
const { RegisterPage } = require("../controller/Register.Controller");
const { LoginController } = require("../controller/Login.Controller");
const { Logout } = require("../controller/Logout.Controller");
const { AuthenticationMiddlewares } = require("../middleware/Admin.Middleware");


//Register Page applied there so we get !
router.post("/api/RegisterPage", RegisterPage);
router.post("/api/LoginPage", LoginController);
router.get('/api/LoggedOut' , AuthenticationMiddlewares,Logout);



module.exports = router;
