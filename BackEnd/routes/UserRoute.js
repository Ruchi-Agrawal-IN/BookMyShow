const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
// import debug from "../Server";
router.post("/register", async (req, res) => {
  try {
    // Encryption for password
    // hash the passsword
    //generate a SALT -> salt is a string of random values that is stored
    //with my hashed value to make it more secure.

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    console.log("hashed password is :", req.body);
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

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("login tried from user", user);
    if (!user) {
      return res.send({
        success: false,
        message: "user doesnot exist!",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
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
