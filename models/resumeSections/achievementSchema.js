const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  showIcon: Boolean,
  items: [
    {
      title: String,
      description: String,
      showDescription: Boolean,
    },
  ],
});

module.exports = achievementSchema;
