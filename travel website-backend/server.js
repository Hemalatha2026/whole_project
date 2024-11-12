const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Destination = require('./models/Destination');
const Booking = require('./models/Booking');
const destinationRoutes = require('./routes/destinationRoutes');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/travel-bookings', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
  });

// Set up EJS view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));  // Serve static files like images

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to sanitize destination names
const sanitizeDestinationName = (destinationName) => {
  return destinationName.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

// Route to render home page with destinations
app.get('/', async (req, res) => {
  try {
    const destinations = await Destination.find();  // Fetch all destinations from DB
    res.render('home', { destinations });  // Render the home.ejs page with destinations
  } catch (err) {
    console.error('Error fetching destinations:', err);
    res.status(500).send('Error loading destinations');
  }
});

// Route to render booking form for a specific destination
app.get('/booking/:destinationName', async (req, res) => {
  const { destinationName } = req.params;
  const originalDestinationName = sanitizeDestinationName(destinationName); // Reverse the sanitization

  try {
    const destination = await Destination.findOne({ name: originalDestinationName });

    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    res.render('booking', { destination });  // Render the booking form with destination data
  } catch (err) {
    console.error('Error fetching destination:', err);
    res.status(500).send('Error loading destination');
  }
});

// Route to handle booking form submission
app.post('/booking/:destinationName', async (req, res) => {
  const { destinationName } = req.params;
  const { name, email, phone } = req.body;  // User's booking details
  const originalDestinationName = sanitizeDestinationName(destinationName);  // Reverse sanitization

  try {
    const destination = await Destination.findOne({ name: originalDestinationName });

    if (!destination) {
      return res.status(404).send('Destination not found');
    }

    // Create a new booking entry
    const newBooking = new Booking({
      destination: destination.name,
      name,
      email,
      phone
    });

    // Save the booking data
    await newBooking.save();

    // Render the booking success page with booking details
    res.render('booking-success', { name, destinationName: originalDestinationName });
  } catch (err) {
    console.error('Error processing booking:', err);
    res.status(500).send('Error processing booking');
  }
});

// Route to handle form submission (add a new destination)
app.post('/add-destination', async (req, res) => {
  const { name, description, details, image } = req.body;  // Collect data from form fields

  try {
    // Create a new destination object
    const newDestination = new Destination({
      name,
      description,
      details,
      image
    });

    // Save the new destination to MongoDB
    await newDestination.save();

    // Redirect to home page after successful addition
    res.redirect('/');  
  } catch (err) {
    console.error('Error adding destination:', err);
    res.status(500).send('Error adding destination');
  }
});

// Route to render form for adding a new destination
app.get('/add-destination', (req, res) => {
  res.render('add-destination');  // Renders the 'add-destination.ejs' file
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
