const { generateToken } = require("../jwt");
const user = require("../Models/authSchema");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkUser = await user.findOne({email})
    if(checkUser){ 
      return res.status(409).json({message:"User already exists!" , success:false})
    }

    const newUser = new user({ name, email, password });

    const response = await newUser.save();

    const payload = {
      id: newUser.id,
    };

    const token = generateToken(payload);
    res.status(200).json({
      message: "Signup Successfully",
      success: true,
      Token: token,
      name: name,
      email: email
    });
  } catch (error) {
    console.error("Error :", error);
  res.status(500).json({ message: "Internal server errror", success: false ,  error : error });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await user.findOne({ email: email });
    if (!userData || !(await userData.comparePassword(password))) {
      return res
        .status(401)
        .json({ success:false  , message: "Invalid email or password" });
    }
    const payload = {
      id: userData.id,
    };
    const token = generateToken(payload);
    return res.status(200).json({  success:true  , message: "Signin Successfully" ,Token: token , name: userData.name, email: userData.email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
};