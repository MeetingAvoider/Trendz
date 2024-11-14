const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Register
const register = async (req, res, next) => {
  console.log(req.body);
  try {
    //model.create() will create and
    const newUser = await userModel.create(req.body);
    return res.status(201).json({
      success: true,
      message: newUser,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: "Failed",
        message: "Please enter email and password",
      });
    }
    const userDetails = await userModel.findOne({ email: email });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "email id doesn't exists ",
      });
    }
    const checkPass = bcrypt.compareSync(password, userDetails.password);
    if (!checkPass) {
      return res.status(404).json({
        success: false,
        message: "wrong email id and password ",
      });
    }
    console.log(process.env.SECRET_KEYS, process.env.EXPIRES_TIME);
    const token = jsonwebtoken.sign(
      { id: userDetails._id, email: email, role: userDetails.role },
      process.env.SECRET_KEYS,
      { expiresIn: process.env.EXPIRES_TIME }
    );
    res.status(200).json({
      success: true,
      message: "logged in successfully",
      token,
      userDetails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout

// Auth middleware

module.exports = { register, login };
