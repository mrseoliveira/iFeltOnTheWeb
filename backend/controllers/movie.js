const Movie = require("../models/movies");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:4200",
};

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    if (isValid) {
      error = null;
    }
    cb(null, "backend/images");
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    //callback cb (error, filename : string)
    //filename = name-date.ext (unique name)
    cb(null, name + "-" + Date.now() + "." + ext);
    // cb(null, file.fieldname + '-' + Date.now())
  },
});

var upload = multer({ storage: storage }).single("file");

exports.createMovie =
  ("",
  function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }

      // console.log(req.file)
      const url = req.protocol + "://" + req.get("host");

      const movie = new Movie({
        title: req.body.title,
        file: url + "/images/" + req.file.filename,
        direction: req.body.direction,
        year: req.body.year,
        country: req.body.country,
        duration: req.body.duration,
        cast: {
          name1: req.body.name1,
          name2: req.body.name2,
        },
      });

      movie
        .save()
        .then((movieAdded) => {
          // console.log('movieId',movieAdded._id)
          // console.log("controller server", movieAdded._id);
          res.status(201).json({
            message: "Movie created",
            movieId: movieAdded._id,
          });
        })
        .catch((err) => {
          console.log("erro");
        });
    });
  });

exports.updateMovie =
  ("/api/movies/:id",
  function (req, res) {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
      } else if (err) {
        // An unknown error occurred when uploading.
      }

      const url = req.protocol + "://" + req.get("host");
      console.log(req.params.id);
      const movie = new Movie({
        _id: req.params.id,
        title: req.body.title,
        file: url + "/images/" + req.file,
        direction: req.body.dlsirection,
        year: req.body.year,
        country: req.body.country,
        duration: req.body.duration,
        cast: {
          name1: req.body.name1,
          name2: req.body.name2,
        },
      });

      const movieToupdate = movie.findOne({ _id: req.params.id });
      console.log(movieToupdate);
      // .findByIdAndUpdate({ _id: req.params.id }, { movie })
      // .then((result) => {
      //   res.status(200).json({ message: "Update successful!" });
      // });
    });
  });

exports.listMovies =
  ("/api/movies",
  (req, res, next) => {
    Movie.find()
      .then((movies) => {
        // console.log("getMovies server", documents);
        res.status(200).json({
          message: "Movies sent",
          movies: movies,
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
