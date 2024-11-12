const mongoose = require('mongoose');
const Destination = require('./models/Destination');  // Adjust the path as needed

mongoose.connect('mongodb://localhost:27017/travel-bookings', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Create a new destination object
    const newDestination = new Destination({
      name: "Paris",
      description: "The capital of France",
      details: "A city known for its culture and landmarks like the Eiffel Tower.",
      image: "https://tse2.mm.bing.net/th?id=OIP.YGAo4ULc84h7VNrV60dRVgHaEK&pid=Api&P=0&h=220"
    });

    // Save it to the database
    await newDestination.save();
    console.log('Destination added successfully');

    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    mongoose.disconnect();
  });
