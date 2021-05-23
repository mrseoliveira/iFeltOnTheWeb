const Movie = require("../models/movies");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path")


const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};


const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:4200",
};


var upload = multer({ dest: '../images' })


exports.createMovie =
  (upload.single('uploaded_file'), (req, res) => {
  // req.file is the name of your file in the form above, here 'uploaded_file'
  // req.body will hold the text fields, if there were any
  console.log('entrou')
  console.log(req.body)
  console.log(req.file)
});

// //multer.diskStorage() to configure how multer works the string
// const storage = multer.diskStorage({
//   //multer.diskStorage {destination:()=>{}, filename:()=>{}}
//   destination: (req, file, cb) => {
//     const isValid = MIME_TYPE_MAP[file.mimetype];
//     //security measure
//     let error = new Error("Invalid mime type");
//     if (isValid) {
//       error = null;
//     }
//     //guarda nesta pasta
//     //callback cb (error, filename : string)
//     cb(error, "../images");
//   },
//   //renomeia o ficheiro
//   filename: (req, file, cb) => {
//     //any space will be replaced with an -
//     const name = file.originalname.toLowerCase().split(" ").join("-");
//     const ext = MIME_TYPE_MAP[file.mimetype];
//     //callback cb (error, filename : string)
//     //filename = name-date.ext (unique name)
//     // cb(null, name + "-" + Date.now() + "." + ext);
//     // cb(null, name + "." + ext);
//     cb(null, `${new Date().toISOString().replace(/:/g,'-')}.${extension}`)
//   },
// });


// exports.createMovie =
//   ("/api/movies",
//   cors(corsOptions), (req, res)=>{


//   let upload = multer({ storage: storage }).single("image")

//   upload(req, res, function(err){

//     const url = req.protocol + "://" + req.get("host");

//     console.log(req.file.filename)
//     // storage(req,res,(ee)=>{

//   })})
    // const movie = new Movie({
    //   title: req.body.title,
    //   file: url + "/images/" + req.file,
    //   direction: req.body.direction,
    //   year: req.body.year,
    //   country: req.body.country,
    //   duration: req.body.duration,
    //   cast: {
    //     name1: req.body.cast.name1,
    //     name2: req.body.cast.name2,
    //   },
    // })
  // });



    // movie
    //   .save()
    //   .then((movieAdded) => {
    //     // console.log('movieId',movieAdded._id)
    //     // console.log("controller server", movieAdded._id);
    //     res.status(201).json({
    //       message: "Movie created",
    //       movieId: movieAdded._id,
    //     });
    //   })
    //   .catch((err)=>{
    //     console.log('erro')
    //   });

  // });

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
