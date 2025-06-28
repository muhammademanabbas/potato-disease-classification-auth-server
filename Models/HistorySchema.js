const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // This refers to the 'user' model you already have
        required: true
    },
    originalFileName: { // Stores the original name of the uploaded file
        type: String,
        required: true
    },
    diseaseDetected: { // Corresponds to "Result: Healthy 🥔"
        type: String,
        required: true
    },
    confidence: { // Corresponds to "Confidence: 100.00 %"
        type: Number, // Store as a number, you can format it as percentage in React
        required: true
    },
    classificationDate: { // Corresponds to "Date: 6/24/2025, 8:01:08 PM"
        type: Date,
        default: Date.now
    },
    base64Image: { // save the base64 image url
        type: String,
        required: true
    }
});

const History = mongoose.model('History', historySchema);

module.exports = History;