const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
  showSlider: Boolean,
  showProficiency: String,
  indicatorType: String,
  items: [
    {
      name: String,
      level: {
        type: Number,
        min: 0,
        max: 10,
      },
      levelText: String,
    },
  ],
});

module.exports = languageSchema;
