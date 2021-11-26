const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema(
  {
    enabled: Boolean,
    name: String,
    order: Number,
  },
  { discriminatorKey: 'record', _id: false }
);

module.exports = baseSchema;
