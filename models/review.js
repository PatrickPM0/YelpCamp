const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// simply  schema for star rating
const reviewSchema = new Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", reviewSchema)
