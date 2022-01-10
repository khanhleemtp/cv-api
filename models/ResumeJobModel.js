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
    status: {
      type: String,
      enum: [
        'luu-viec',
        'tiep-nhan',
        'de-nghi',
        'phu-hop',
        'hen-phong-van',
        'nhan-viec',
        'tu-choi',
        'theo-doi',
      ],
    },
    viewed: {
      type: Boolean,
      default: false,
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
//     path: 'job',
//     select: 'title position',
//   });
//   next();
// });

// resumeJobSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'name email resume',
//   });
//   next();
// });

const ResumeJob = mongoose.model('ResumeJob', resumeJobSchema);

module.exports = ResumeJob;
