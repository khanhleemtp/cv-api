const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  items: [
    {
      position: String,
      workplace: String,
      description: String,
      location: String,
      link: String,
      dateRange: {
        from: Date,
        to: Date,
        isOngoing: Boolean,
      },
      showTitle: Boolean,
      showCompany: Boolean,
      showDescription: Boolean,
      showLocation: Boolean,
      showDateRange: Boolean,
      showBullets: Boolean,
      showLink: Boolean,
      bullets: [
        {
          text: String,
        },
      ],
    },
  ],
});

module.exports = experienceSchema;
