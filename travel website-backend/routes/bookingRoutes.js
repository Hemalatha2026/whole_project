const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination');
const Booking = require('../models/Booking');

// GET route to render the booking form (using destination name)
router.get('/:destinationName', async (req, res) => {
  const { destinationName } = req.params;

  try {
    // Find the destination by name
    const destination = await Destination.findOne({ name: destinationName });

    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    // Render the booking form with the destination details
    res.render('booking', { destination });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Server Error');
  }
});

// POST route to handle booking submission
router.post('/:destinationName', async (req, res) => {
  const { destinationName } = req.params;
  const { customerName, email, noOfDays, startDate, endDate, noOfPeople } = req.body;

  try {
    // Find the destination by name
    const destination = await Destination.findOne({ name: destinationName });

    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    // Create a new booking with the destination's ObjectId
    const booking = new Booking({
      destination: destination._id, // Use destination's ObjectId for reference
      customerName,
      email,
      noOfDays,
      startDate,
      endDate,
      noOfPeople
    });

    // Save the booking to the database
    await booking.save();

    // Redirect to a confirmation page with success message
    res.redirect('/your-places?message=Booking successful');
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).send(' processing booking');
  }
});

module.exports = router;
