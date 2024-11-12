const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },  // Ensure it's an ObjectId
  noOfDays: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  noOfPeople: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
