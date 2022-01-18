const mongoose = require('mongoose');
const baseSchema = require('./resumeSections/baseSectionSchema');
const headerSchema = require('./resumeSections/headerSchema');
const educationSchema = require('./resumeSections/educationSchema');
const experienceSchema = require('./resumeSections/experienceSchema');
const languageSchema = require('./resumeSections/languageSchema');
const referenceSchema = require('./resumeSections/referenceSchema');
const summarySchema = require('./resumeSections/summarySchema');
const technologySchema = require('./resumeSections/technologySchema');
const achievementSchema = require('./resumeSections/achievementSchema');
const slugify = require('slugify');

const resumeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
    },
    title: {
      type: String,
      default: '',
      trim: true,
    },
    isPrimary: {
      type: Boolean,
    },
    style: {
      layout: {
        type: String,
        default: 'double',
      },
      colors: {
        type: [String],
        default: ['blue', 'gray'],
      },
      background: {
        type: String,
      },
      font: {
        type: String,
      },
      layoutSize: {
        type: String,
      },
      marginOption: {
        type: String,
      },
    },
    header: {
      type: headerSchema,
    },
    sections: [baseSchema],
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    views: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Company',
      },
    ],
    contact: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// discriminator section
const sectionsArray = resumeSchema.path('sections');

// sectionsArray.discriminator('HeaderSection', headerSchema);

sectionsArray.discriminator('AchievementSection', achievementSchema);
sectionsArray.discriminator('LanguageSection', languageSchema);
sectionsArray.discriminator('ReferenceSection', referenceSchema);
sectionsArray.discriminator('EducationSection', educationSchema);
sectionsArray.discriminator('ExperienceSection', experienceSchema);
sectionsArray.discriminator('SummarySection', summarySchema);
sectionsArray.discriminator('TechnologySection', technologySchema);

// Query
resumeSchema.pre('save', function (next) {
  this.slug = slugify(this.header.title, { lower: true, locale: 'vi' });
  next();
});

resumeSchema.post('findOneAndUpdate', function (doc, next) {
  // console.log(doc);
  doc.slug = slugify(doc.header.title, { lower: true, locale: 'vi' });
  doc.save();
  console.log(doc);
  next();
});

// resumeSchema.virtual('applies', {
//   ref: 'ResumeJob',
//   foreignField: 'resume',
//   localField: '_id',
//   justOne: false,
// });

// resumeSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'applies',
//   });
//   next();
// });

const ResumeModel = mongoose.model('Resume', resumeSchema);

module.exports = ResumeModel;
