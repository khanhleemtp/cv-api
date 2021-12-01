const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  items: [
    {
      degree: String,
      institution: String,
      location: String,
      gpa: Number,
      maxGpa: Number,
      gpaText: String,
      dateRange: {
        from: Date,
        to: Date,
        isOngoing: Boolean,
      },
      showGpa: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      bullets: [
        {
          text: String,
        },
      ],
    },
  ],
});

module.exports = educationSchema;
