const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  surroundingBorder: Boolean,
  items: [
    {
      title: String,
      showTitle: Boolean,
      tags: [String],
    },
  ],
});

module.exports = technologySchema;
