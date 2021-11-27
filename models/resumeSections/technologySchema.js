const mongoose = require('mongoose');

const technologySchema = new mongoose.Schema({
  surroundingBorder: Boolean,
  items: [
    {
      title: String,
      showTitle: Boolean,
      tags: [
        {
          text: String,
        },
      ],
    },
  ],
});

module.exports = technologySchema;
