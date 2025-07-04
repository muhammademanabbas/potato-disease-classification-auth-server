const user = require("../Models/authSchema.js");
const history =require("../Models/HistorySchema.js")

const getUserProfile = async (req, res) => {
  try {
    if (!req.userDetail)
      res
        .status(401)
        .json({ Error: "Please Login first to access this route" });
    const userData = await user.findById(req.userDetail.id);

    const response = { name: userData.name, email: userData.email };

    res
      .status(200)
      .json({ message: "User Profile", success: "true", response: response });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      res.status(401).json({ message: "please fill all the fields" });

    const userData = await user.findById(req.userDetail.id);

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!user || !(await userData.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    userData.password = newPassword;
    const savedData = await userData.save();

    const response = {
      name: savedData.name,
      email: savedData.email,
    };

    res.status(200).json({
      message: "Password Updated",
      success: "true",
      response: response,
    });
  } catch (error) {
    console.error("Error :", error);
    res.status(500).json({ Error: "Internal Server Error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    // Ensure req.userDetail.id exists before proceeding
    if (!req.userDetail || !req.userDetail.id) {
      return res.status(400).json({ error: "User ID not provided in request details." });
    }

    const DeletedUserID = req.userDetail.id;

    const historyDeleted = await history.deleteMany({ userId: req.userDetail.id });

    // Use findByIdAndDelete and await its completion
    const isDeleted = await user.findByIdAndDelete(DeletedUserID);

    // If the user was not found or not deleted
    if (!isDeleted) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Prepare the response object with details of the deleted user
    const response = {
      name: isDeleted.name,
      email: isDeleted.email,
    };

    return res.status(200).json({ message: "User successfully deleted!", success: true, response });

  } catch (error) {
    console.error("Error occurred during user deletion:", error);

    // Send a generic 500 Internal Server Error response to the client
    // Avoid sending sensitive error details to the client in production
    return res.status(500).json({ error: "Internal Server Error during user deletion." });
  }
};

module.exports = {
  getUserProfile,
  updatePassword,
  deleteAccount,
};