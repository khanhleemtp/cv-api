const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  items: [String],
});

module.exports = summarySchema;
