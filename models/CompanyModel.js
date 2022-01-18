const mongoose = require('mongoose');
const slugify = require('slugify');

const companySchema = new mongoose.Schema(
  {
    phone: String,
    email: String,
    slug: String,
    name: {
      type: String,
      require: true,
      unique: true,
      trim: true,
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
    address: String,
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
      enum: ['product', 'outsource', 'other'],
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

companySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, locale: 'vi' });
  next();
});

companySchema.post('findOneAndUpdate', function (doc, next) {
  // console.log(doc);
  doc.slug = slugify(doc.name, { lower: true, locale: 'vi' });
  doc.save();
  console.log(doc);
  next();
});

// companySchema.virtual('hostInfo', {
//   ref: 'User',
//   foreignField: '_id',
//   localField: 'host',
//   justOne: true,
// });

// companySchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'hostInfo',
//   });
//   next();
// });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

// 1 người follow nhiều công ty
// 1 công ty có nhiều người follow
