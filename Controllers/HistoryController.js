const HistoryModel = require("../Models/HistorySchema");

// This controller handles saving classification history for users
const saveClassificationHistory = async (req, res) => {
  try {

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded." });
    }


    const base64Image = req.file.buffer.toString("base64");

    const { diseaseDetected, confidence, originalFileName } = req.body;

    // Basic validation (you might want more robust validation)
    if (
      !diseaseDetected ||
      !confidence ||
      !originalFileName ||
      !req.userDetail.id
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required history data." });
    }

    // Create and save the new history entry
    const newHistoryEntry = new HistoryModel({
      originalFileName,
      diseaseDetected,
      confidence,
      classificationDate: new Date(), // Set current date/time
      base64Image: base64Image, // Save the base64 image
      userId: req.userDetail.id, // Assuming userDetail contains the user ID
    });

    await newHistoryEntry.save();

    res.status(201).json({
      success: true,
      message: "Classification history saved successfully!",
      historyEntry: newHistoryEntry, // Optionally return the saved entry
    });
  } catch (error) {
    console.error("Error saving classification history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to save classification history.",
      error: error.message,
    });
  }
};

// This controller handles retrieving classification history for users
const getClassificationHistory = async (req, res) => {
  try {
    if (!req.userDetail.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not logged in." });
    }

    const userHistory = await HistoryModel.find({
      userId: req.userDetail.id,
    })
      .select("-userId") // <-- Add this line to exclude the userId field
      .sort({ classificationDate: -1 });

    res.status(200).json({
      success: true,
      history: userHistory, // This array will contain only the history entries for req.user._id
    });
  } catch (error) {
    console.error("Error fetching user history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user history.",
      error: error.message,
    });
  }
};

// This controller handles clearing classification history for users
const clearAllHistory = async (req, res) => {
  try {
    if (!req.userDetail.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not logged in." });
    }

    await HistoryModel.deleteMany({ userId: req.userDetail.id });

    res.status(200).json({
      success: true,
      message: "All classification history cleared successfully.",
    });
  } catch (error) {
    console.error("Error clearing user history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear user history.",
      error: error.message,
    });
  }
};

const clearSingleHistoryEntry = async (req, res) => {
  try {
    if (!req.userDetail.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User not logged in." });
    }
    const historyId = req.params.id;
    // extract the history id from the url

    await HistoryModel.deleteOne({ _id: historyId, userId: req.userDetail.id });

    res.status(200).json({
      success: true,
      message: "Classification history entry cleared successfully.",
    });
  } catch (error) {
    console.error("Error clearing history entry", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear history entry",
      error: error.message,
    });
  }
};

module.exports = {
  saveClassificationHistory,
  getClassificationHistory,
  clearAllHistory,
  clearSingleHistoryEntry,
};