const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Location name
  description: { type: String, required: true },  // Description of the destination
  image: { type: String, required: true },  // URL for the destination image
});

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
