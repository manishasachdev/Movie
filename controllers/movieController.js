const Movie = require("./../models/moviemodel");

//to get all movies
exports.getAllMovies = async (req, res) => {
  try {
    // Send the data as a response

    const movieList = await Movie.find();
    res.status(200).json({
      status: "success",
      data: {
        movies: movieList,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Error fetching movies",
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    // Send the data as a response

    const filterMovie = await Movie.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        filterMovie,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Unable to find movie with this id",
    });
  }
};

//to create new movie
exports.createMovie = async (req, res) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: newMovie,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to create movies",
    });
  }
};

//to update movie
exports.updateMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: updatedMovie,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to update movies",
    });
  }
};

//to delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: updatedMovie,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Failed to delete movies",
    });
  }
};
