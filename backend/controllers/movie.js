const Movie = require("../models/movies");
const mongoose = require("mongoose");

const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:4200",
};

exports.createMovie =
  ("/api/movies",
  cors(corsOptions),
  (req, res, next) => {
    const movie = new Movie({
      _id: req.body.id,
      title: req.body.title,
      file: req.body.file,
      direction: req.body.direction,
      year: req.body.year,
      country: req.body.country,
      duration: req.body.duration,
      cast: {
        name1: req.body.cast.name1,
        name2: req.body.cast.name2,
      },
    });

    movie
      .save()
      .then((movieAdded) => {
        // console.log("controller server", movieAdded._id);
        res.status(201).json({
          message: "Movie created",
          movieId: movieAdded._id,
        });
      })
      .catch();
  });

exports.listMovies =
  ("/api/movies",
  (req, res, next) => {
    Movie.find()
      .then((documents) => {
        // console.log("getMovies server", documents);
        res.status(200).json({
          message: "Movies sent",
          movies: documents,
        });
      })
      .catch(() => {
        res.status(201).json({
          message: "There was an error",
        });
      });
  });

exports.getMovie =
  ("api/movies/:id",
  (req, res, next) => {
    // console.log("req.params", req.params);
    Movie.findById(req.params.id)
      .then((movie) => {
        res.status(200).json({
          returnedMovie: movie,
        });
      })
      .catch();
  });
