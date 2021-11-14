const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      contact: Number,
      showContact: String,
    },
  ],
});

module.exports = referenceSchema;
