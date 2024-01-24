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
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
