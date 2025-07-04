const express = require("express");
const router = express.Router();
const { jwtAuthMiddleware } = require("../jwt.js");
const { saveClassificationHistory, getClassificationHistory, clearAllHistory, clearSingleHistoryEntry } = require("../Controllers/HistoryController.js");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/", jwtAuthMiddleware, getClassificationHistory);
router.post("/", jwtAuthMiddleware, upload.single("potatoleafImage"), saveClassificationHistory);
router.delete("/", jwtAuthMiddleware, clearAllHistory);
router.delete("/:id", jwtAuthMiddleware, clearSingleHistoryEntry);

module.exports = router;