const router = require("express").Router();
const Movie = require("../models/MovieModel");

router.post("/add-movie", async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.status(200).send({
      success: true,
      message: "Movie is added!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `error message : ${error.message}`,
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send({
      success: true,
      message: "Movies fetched",
      movies,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/update-movie", async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.status(200).send({
      success: true,
      message: `Movie is updated with latest info: ${res.body}`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Movie Update Failed : ${error.message}`,
    });
  }
});

router.delete("/delete-movie", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({
      success: true,
      message: "movie deleted!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: `error in movie deletion : ${error.message}`,
    });
  }
});


router.get("/get-by-id/:movieId", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId);

    res.status(200).send({
      success: true,
      message: "Movie details fetched",
      movie,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "There was some issue in fetching movie.",
    });
  }
});

module.exports = router;
