const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt");
const {loginValidation,signupValidation} = require("../Middlewares/AuthValidation.js");
const {signup,login} = require("../Controllers/AuthControllers.js");
const productRoute = require("../Controllers/ProductController.js");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
router.get("/products", jwtAuthMiddleware, productRoute);

module.exports = router;