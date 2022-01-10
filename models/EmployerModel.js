const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema(
  {
    phone: String,
    fb: String,
    location: {
      type: String,
      enum: ['ha-noi', 'ho-chi-minh', 'da-nang', 'other'],
      default: 'ha-noi',
    },
    isActive: Boolean,
    companyName: {
      type: String,
    },
    position: {
      type: String,
      enum: ['nhan-vien', 'giam-doc', 'truong-phong', 'other'],
      default: 'nhan-vien',
    },
    _id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// employerSchema.virtual('userHost', {
//   ref: 'User',
//   foreignField: '_id',
//   localField: '_id',
//   justOne: true,
// });

employerSchema.pre(/^find/, function (next) {
  this.populate([
    // {
    //   path: 'userHost',
    //   select: 'name email',
    // },
    {
      path: 'company',
    },
  ]);

  next();
});

const Employer = mongoose.model('Employer', employerSchema);

module.exports = Employer;
