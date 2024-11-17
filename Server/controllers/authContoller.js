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
        success: false,
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

    const token = jsonwebtoken.sign(
      { id: userDetails._id, email: email, role: userDetails.role },
      process.env.SECRET_KEYS,
      { expiresIn: process.env.EXPIRES_TIME }
    );
    // res.status(200).json({
    //   success: true,
    //   message: "logged in successfully",
    //   token,
    //   userDetails,
    // });
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "logged in successfullyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
      user: {
        email: userDetails.email,
        role: userDetails.role,
        id: userDetails._id,
      },
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Logout
const logout = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged Out Successfully",
  });
};

// Auth middleware
const authMiddlerWare = async (req, res, next) => {
  const token = req.cookie.token;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized users",
    });
  }
  try {
    const decode = jsonwebtoken.verify(token, process.env.SECRET_KEYS);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { register, login, logout, authMiddlerWare };
