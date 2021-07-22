const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
 _id: { type: mongoose.Types.ObjectId, primaryKey: true, autoIncrement: true },
  title: { type: String, required: true },
  file: { type: String },
  direction: { type: String, required: true },
  year: { type: String, required: true },
  country: { type: String },
  duration: { type: String },
  cast: {
    name1: { type: String },
    name2: { type: String },
  },
});

module.exports = mongoose.model("Movie", movieSchema);
