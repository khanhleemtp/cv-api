const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  items: [
    {
      text: String,
    },
  ],
});

module.exports = summarySchema;
