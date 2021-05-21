const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const dbConfig = require("./backend/config/db.config.js");
const app = express();

const movieRoutes = require("./backend/routes/movie");

const cors = require("cors");

let corsOptions = {
  origin: "http://localhost:4200",
};

cors(corsOptions);

//camada mongoose
mongoose
//   // .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  .connect(`mongodb+srv://${dbConfig.HOST}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

//camada leitura de dados
app.use(express.json({limit: '50mb', extended: true}));
app.use(express.urlencoded());



app.use("/images", express.static(path.join("backend/images")));


// mongoose
//   .connect(
//     "mongodb://localhost:27017/ifelt",
//     { useNewUrlParser: true },
//     { useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((error) => console.log(error));

//camada de configuração dos pedidos
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use("/api/movies", movieRoutes);
// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
