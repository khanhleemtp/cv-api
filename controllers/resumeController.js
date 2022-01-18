const Resume = require('../models/ResumeModel');
const { profileImage } = require('../utils/upload');
const catchAsync = require('../utils/catchAsync');
const slugify = require('slugify');
const omit = require('lodash/omit');

const factory = require('./handleFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.setUserQuery = (req, res, next) => {
  // Allow nested routes
  console.log('userID', req.user.id);
  if (req.user.id) req.query.user = req.user.id;
  next();
};

exports.uploadImage = profileImage.single('photo');

exports.handleAfterUpload = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const photo = req.file.location;
  req.body.header = { photo };
  req.body.isObject = true;
  // console.log(req.body);
  next();
});

exports.setQuerySkill = (req, res, next) => {
  if (req.query.skills) {
    let skillsQuery = String(req.query.skills).trim().split(',');
    req.query = omit(req.query, 'skills');
    req.query = {
      ...req.query,
      ['sections.items.tags.text']: {
        $in: [...skillsQuery],
      },
    };
  }
  next();
};

exports.setQueryTitle = (req, res, next) => {
  if (req.query.slug) {
    const s = slugify(req.query.slug, { lower: true, locale: 'vi' });
    const regex = new RegExp(s, 'i'); // i for case insensitive
    req.query.slug = { $regex: regex };
  }

  next();
};

exports.createResume = factory.createOne(Resume);

exports.getResume = factory.getOne(Resume);

exports.updateResume = factory.updateOne(Resume);

exports.getAllResumes = factory.getAll(Resume, true);

exports.deleteResume = factory.deleteOne(Resume);
