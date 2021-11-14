const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    location: String,
    position: String,
    type: String,
    photo: {
      type: String,
      default: '/user.png',
    },
    numEmployees: Number,
    status: {
      type: String,
      enum: ['pending', 'accept', 'reject'],
      default: 'pending',
    },
    intro: String,
    details: String,
    env: [
      {
        type: String,
      },
    ],
    opportunity: [String],
    workTime: String,
    ot: String,
    country: String,
    // totalJob: Number,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
