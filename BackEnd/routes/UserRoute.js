const router = require("express").Router();
const User = require("../models/UserModel");
router.post("/register", async (req, res) => {
  try {
    const requestBody = req.body;
    const newUser = new User(requestBody);
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "user registered!",
    });
  } catch (e) {
    debug("error message:", e.message);
    res.status(500).json({ success: false, message: e.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "user doesnot exist!",
      });
    }
    const isPasswordValid = user.password === req.body.password;
    if (!isPasswordValid) {
      return res.send({
        success: false,
        message: "Password is invalid",
      });
    }
    res.status(200).json({ message: "Logged in" });
  } catch (error) {
    debug("login failed");
    res.status(500).json({ success: false, message: e.message });
  }
});
module.exports = router;
