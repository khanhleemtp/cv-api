const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  items: [
    {
      position: String,
      workplace: String,
      description: String,
      location: String,
      dateRange: {
        fromYear: Number,
        fromMonth: Number,
        toMonth: Number,
        toYear: Number,
        isOngoing: Boolean,
      },
      bullets: [String],
      showTitle: Boolean,
      showCompany: Boolean,
      showDescription: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      showLink: Boolean,
    },
  ],
});

module.exports = experienceSchema;
