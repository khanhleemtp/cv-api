const mongoose = require('mongoose');
const slugify = require('slugify');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      lowercase: true,
      require: [true, 'Hãy nhập tiêu đề công việc'],
    },
    slug: { type: String },
    type: {
      type: String,
      // enum: ['full-time', 'part-time', 'remote', 'inter'],
    },
    position: {
      type: String,
      lowercase: true,
      require: [true, 'Hãy nhập cấp bậc'],
    },
    experience: {
      type: String,
    },
    area: [String],
    fields: [String],
    salary: {
      type: String,
    },
    numOfPerson: {
      type: Number,
    },
    descriptions: String,
    requirements: String,
    benefits: String,
    skills: [
      {
        type: String,
      },
    ],
    to: {
      type: Date,
      min: [Date.now(), 'Hãy nhập thời gian hợp lệ'],
    },
    company: {
      type: mongoose.Types.ObjectId,
      ref: 'Company',
    },
    employer: {
      type: mongoose.Types.ObjectId,
      ref: 'Employer',
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
    },
    status: {
      type: String,
      enum: ['running, pending, finishing'],
    },
    savedCv: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Resume',
      },
    ],
    invitedCv: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Resume',
      },
    ],
  },
  {
    //virtuals properties not save in db but caculate
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

jobSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true, locale: 'vi' });
  next();
});

// jobSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'company',
//     match: {
//       status: 'accept',
//     },
//   });
//   next();
// });

jobSchema.virtual('companyInfo', {
  ref: 'Company',
  foreignField: '_id',
  localField: 'company',
  justOne: true,
});

jobSchema.virtual('listInvitedCv', {
  ref: 'Resume',
  foreignField: '_id',
  localField: 'invitedCv',
  justOne: false,
});

jobSchema.virtual('listSavedCv', {
  ref: 'Resume',
  foreignField: '_id',
  localField: 'savedCv',
  justOne: false,
});

jobSchema.pre(/^find/, function (next) {
  // this points to current query
  this.populate([
    {
      path: 'companyInfo',
    },
    {
      path: 'listInvitedCv',
    },
    {
      path: 'listSavedCv',
    },
  ]);
  next();
});

// jobSchema.virtual('resumeJob', {
//   ref: 'ResumeJob',
//   foreignField: 'job',
//   localField: '_id',
//   justOne: false,
// });

// get all job active
// jobSchema.pre(/^find/, function (next) {
//   // this points to current query
//   this.populate({
//     path: 'resumeJob',
//   });
//   next();
// });

jobSchema.post('findOneAndUpdate', function (doc, next) {
  // console.log(doc);
  doc.slug = slugify(doc.title, { lower: true, locale: 'vi' });
  doc.save();
  console.log(doc);
  next();
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
