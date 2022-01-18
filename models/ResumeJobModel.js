const mongoose = require('mongoose');
const resumeJobSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Types.ObjectId,
      ref: 'Job',
    },
    resume: {
      type: mongoose.Types.ObjectId,
      ref: 'Resume',
    },
    received: {
      type: String,
      enum: ['theo-doi', 'tiep-nhan', 'de-nghi'],
    },
    response: {
      type: String,
      enum: ['phu-hop', 'hen-phong-van', 'nhan-viec', 'tu-choi'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

resumeJobSchema.index({ job: 1, resume: 1 }, { unique: true });

// resumeJobSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name email resume',
//   });
//   next();
// });
resumeJobSchema.virtual('jobInfo', {
  ref: 'Job',
  foreignField: '_id',
  localField: 'job',
  justOne: true,
});

resumeJobSchema.virtual('resumeInfo', {
  ref: 'Resume',
  foreignField: '_id',
  localField: 'resume',
  justOne: true,
});

resumeJobSchema.pre(/^find/, function (next) {
  this.populate([
    {
      path: 'jobInfo',
    },
    {
      path: 'resumeInfo',
    },
  ]);
  next();
});

const ResumeJob = mongoose.model('ResumeJob', resumeJobSchema);

module.exports = ResumeJob;
