const router = require("express").Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const Show = require("../models/ShowModel");

router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();

    res.status(200).send({
      success: true,
      message: "Show is added!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "There was some error in adding shows!",
    });
  }
});

router.get("/get-all-shows-by-theatre-id", authMiddleware, async (req, res) => {
  try {
    const shows = await Show.find({ owner: req.body.theatreId })
      .populate("movie")
      .populate("theatre");
  console.log({ theatreId: req.body.theatreId, shows: shows });
    res.status(200).send({
      success: true,
      message: "Shows fetched",
      shows,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "There was some issue in fetching shows for user.",
    });
  }
});

router.post("/update-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);

    res.send({
      success: true,
      message: "Theatre updated with latest info!",
    });
  } catch (error) {
    res.send({
      success: false,
      error: "Something went wrong!",
    });
  }
});

router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Some issue!",
    });
  }
});

module.exports = router;
