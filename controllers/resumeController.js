const Resume = require('../models/ResumeModel');

const factory = require('./handleFactory');

exports.setUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.createResume = factory.createOne(Resume);

exports.getResume = factory.getOne(Resume);

exports.updateResume = factory.updateOne(Resume);

exports.getAllResumes = factory.getAll(Resume);

exports.deleteResume = factory.deleteOne(Resume);
