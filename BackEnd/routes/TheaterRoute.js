const router = require("express").Router();
const authMiddleware = require("../middleware/AuthMiddleware");
const Theatre = require("../models/TheaterModel");

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.status(200).send({
      success: true,
      message: "Theatre is added!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Add-Theatre request failed: ${error.message}`,
    });
  }
});

router.get("/get-all-theatres-by-user-id", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.body.userId });
    if (theatres) {
      res.status(200).send({
        success: true,
        message: "Theatres fetched successfully!",
        theatres,
      });
    } else {
      res.status(501).send({
        success: false,
        message: "There was some issue in fetching theatres for user.",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Failed to fetch Theatres for user: ${error.message}`,
    });
  }
});
router.get("/get-all-theatres", async (req, res) => {
  console.log(`get-all-theatres req object: ${req.params}`);
  try {
    // TODO: Populate only certain fields for user/owner

    const theatres = await Theatre.find().populate("owner", "-password");

    res.status(200).send({
      success: true,
      message: "Theatres fetched",
      theatres,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `There was some issue in fetching theatres for user: ${error.message}`,
    });
  }
});

router.post("/update-theatre", authMiddleware, async (req, res) => {
  try {
    const response = await Theatre.findByIdAndUpdate(
      req.body.theatreId,
      req.body
    );
    if (response) {
      res.status(200).send({
        success: true,
        message: "Theatre updated with latest info!",
      });
    } else {
      res.send({
        success: false,
        error: `Theatre update request failed: ${err.message}`,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      error: `Theatre update failed, error catched: ${error.message}`,
    });
  }
});

router.post("/delete-theatre", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Some issue!",
    });
  }
});

module.exports = router;
