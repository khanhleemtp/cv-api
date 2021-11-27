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
        fromYear: Number,
        fromMonth: Number,
        toMonth: Number,
        toYear: Number,
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
