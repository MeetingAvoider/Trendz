const express = require("express");
const { register, login } = require("../controllers/authContoller");
const router = express.Router();
router.post("/signup", register);
router.post("/signin", login);
module.exports = router;
