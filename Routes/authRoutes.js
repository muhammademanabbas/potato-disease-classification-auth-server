const express = require("express");
const router = express.Router();
const {loginValidation,signupValidation} = require("../Middlewares/AuthValidation.js");
const {signup,login} = require("../Controllers/AuthControllers.js");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);


module.exports = router;