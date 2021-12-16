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

const resumeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: '',
    },
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isImported: {
      type: Boolean,
      default: false,
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

const ResumeModel = mongoose.model('Resume', resumeSchema);

module.exports = ResumeModel;
