const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    phone: String,
    email: String,
    name: {
      type: String,
      require: true,
      unique: true,
    },
    tax: {
      type: String,
    },
    logo: {
      type: String,
    },
    fields: [String],
    size: {
      type: String,
    },
    address: [String],
    area: [String],
    status: {
      type: String,
      enum: ['pending', 'accept', 'reject'],
      default: 'pending',
    },
    descriptions: {
      type: String,
      default: '',
    },
    website: String,
    type: {
      type: String,
      enum: ['product', 'outsoure', 'other'],
      default: 'product',
    },
    host: {
      type: mongoose.Types.ObjectId,
      ref: 'Employer',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// companySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'host',
//   });
//   next();
// });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

// 1 người follow nhiều công ty
// 1 công ty có nhiều người follow
