const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  city: String,
  state: String,
  price: Number,
  type: String,
  image: String // store Base64 or file path
});

module.exports = mongoose.model('Hotel', hotelSchema);