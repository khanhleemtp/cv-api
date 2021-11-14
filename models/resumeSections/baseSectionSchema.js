const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema(
  {
    enabled: Boolean,
    name: String,
    column: Number,
    height: Number,
  },
  { discriminatorKey: 'record', _id: false }
);

module.exports = baseSchema;
