const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt");
const productRoute = require("../Controllers/ProductController.js");

router.get("/",jwtAuthMiddleware ,productRoute);

module.exports = router;