const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt.js");
const { getUserProfile, updatePassword, deleteAccount } = require("../Controllers/userController.js")

router.get("/profile", jwtAuthMiddleware, getUserProfile);
router.patch("/profile/password", jwtAuthMiddleware, updatePassword);
router.delete("/profile/delete", jwtAuthMiddleware, deleteAccount);

module.exports = router;