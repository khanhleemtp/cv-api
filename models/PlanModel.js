const mongoose = require('mongoose');

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ['basic', 'pro'],
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const PlanModel = mongoose.model('Plan', planSchema);

module.exports = PlanModel;
