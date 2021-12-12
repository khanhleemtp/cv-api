const Resume = require('../models/ResumeModel');
const { profileImage } = require('../utils/upload');
const catchAsync = require('../utils/catchAsync');

const factory = require('./handleFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
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

exports.createResume = factory.createOne(Resume);

exports.getResume = factory.getOne(Resume);

exports.updateResume = factory.updateOne(Resume);

exports.getAllResumes = factory.getAll(Resume);

exports.deleteResume = factory.deleteOne(Resume);
