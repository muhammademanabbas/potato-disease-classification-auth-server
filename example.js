const { application } = require("express");

app.post(
  "/predict/history",
  (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
      return res.status(401).json({ token: "Token Not Found" });

    const token = authorization.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorization" });

    try {
      const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.userDetail = decodedPayload;
      next();
    } catch (error) {
      res.status(401).json({ Token: "Invalid Token" });
    }
  },
  async (req, res) => {
    try {
      let imageFile;

      // Adapt based on your file upload middleware
      if (req.files && req.files.imageFile) {
        // For express-fileupload
        imageFile = req.files.imageFile;
      } else if (req.file) {
        // For multer (single file upload)
        imageFile = req.file;
      } else {
        return res
          .status(400)
          .json({ success: false, message: "No image file uploaded." });
      }

      const originalFileName = imageFile.name; // This gets "00fc2ee5-729f-4757-8aeb-65c3355874f2___RS_HL 1864.JPG"

      // --- Store the image ---
      // You'll need to save the image to a persistent storage
      // This is a placeholder for your actual image saving logic
      // For example, if saving locally:
      const uploadPath = `./uploads/${Date.now()}-${imageFile.name}`; // Create a unique name
      await imageFile.mv(uploadPath); // If using express-fileupload

      const storedImageUrl = `/uploads/${Date.now()}-${imageFile.name}`; // The URL/path you'll use to access it later

      // --- Perform ML prediction ---
      // This is where you'd call your ML model
      const predictionResult = "Healthy"; // Replace with actual ML prediction
      const confidenceScore = 100.0; // Replace with actual ML confidence (ensure it's a number)

      // If the user is authenticated
      if (req.user && req.user._id) {
        const newHistoryEntry = new History({
          userId: req.user._id,
          originalFileName: originalFileName, // Save the original file name
          imageUrl: storedImageUrl, // Save the path to the stored image
          diseaseDetected: predictionResult,
          confidence: confidenceScore,
          classificationDate: new Date(), // Automatically set by default, but can be explicit
        });
        await newHistoryEntry.save();
        console.log("Classification history saved for user:", req.user._id);
      } else {
        console.log("User not logged in, history not saved to DB.");
        // You can still return the result to the user,
        // and perhaps instruct the frontend to save to local storage.
      }

      res.json({
        success: true,
        disease: predictionResult,
        confidence: confidenceScore,
        originalFileName: originalFileName, // Optionally send back to frontend
        imageUrl: storedImageUrl, // Optionally send back to frontend
        classificationDate: new Date(), // Optionally send back to frontend
      });
    } catch (error) {
      console.error("Error during classification:", error);
      res
        .status(500)
        .json({
          success: false,
          message: "Error classifying image",
          error: error.message,
        });
    }
  }
);
