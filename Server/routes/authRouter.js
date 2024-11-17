const express = require("express");
const {
  register,
  login,
  logout,
  authMiddlerWare,
} = require("../controllers/authContoller");
const router = express.Router();
router.post("/signup", register);
router.post("/signin", login);
router.post("/logout", logout);
router.get("/auth-check", authMiddlerWare, (req, res) => {
  const user = req.user;
  console.log(user);
  res.status(200).json({
    status: true,
    message: "User is authenticated",
    user,
  });
});
module.exports = router;
