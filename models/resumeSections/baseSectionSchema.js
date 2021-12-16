const mongoose = require('mongoose');

const baseSchema = new mongoose.Schema(
  {
    enabled: Boolean,
    name: String,
    order: Number,
    column: {
      type: Number,
      default: 1,
    },
  },
  { discriminatorKey: 'record', _id: false }
);

module.exports = baseSchema;
