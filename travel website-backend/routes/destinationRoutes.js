const express = require('express');
const router = express.Router();
const Destination = require('../models/Destination'); // Make sure this path is correct

// POST route to add a new destination
router.post('/add-destination', async (req, res) => {
  const { name, description, details, imageUrl } = req.body;

  try {
    const newDestination = new Destination({
      name,
      description,
      details,
      imageUrl
    });

    await newDestination.save();
    res.status(200).send('Destination added successfully');
  } catch (err) {
    console.error('Error adding destination:', err);
    res.status(500).send('Error adding destination');
  }
});

// Export the router to use in your server.js or app.js
module.exports = router;
