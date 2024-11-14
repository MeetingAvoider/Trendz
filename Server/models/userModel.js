const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your user name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email id"],
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return value !== null && value !== undefined;
      },
      message: "Email cannot be null or undefined",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    default: "user",
  },
});

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const userModel = mongoose.model("user", userSchema); // two parameters: collectionName, collectionSchema
module.exports = userModel;
