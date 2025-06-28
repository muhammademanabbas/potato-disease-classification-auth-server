const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt.js");
const { saveClassificationHistory, getClassificationHistory, clearAllHistory, clearSingleHistoryEntry } = require("../Controllers/HistoryController.js");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/save/history", jwtAuthMiddleware, upload.single("potatoleafImage"), saveClassificationHistory);
router.delete("/clear/history", jwtAuthMiddleware, clearAllHistory);
router.delete("/clear/history/:id", jwtAuthMiddleware, clearSingleHistoryEntry);
router.get("/get/history", jwtAuthMiddleware, getClassificationHistory);

module.exports = router;