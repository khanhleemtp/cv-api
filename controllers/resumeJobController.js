const ResumeJob = require('../models/ResumeJobModel');

const factory = require('./handleFactory');

exports.formatFindJob = (req, res, next) => {
  if (req.query.resume && req.query.resume.in) {
    req.query.resume = {
      $in: Array.from(String(req.query.resume.in).split(',')),
    };
  }
  next();
};

exports.createResumeJob = factory.createOne(ResumeJob);
exports.getAllResumeJob = factory.getAll(ResumeJob);
exports.getResumeJob = factory.getOne(ResumeJob);
exports.updateResumeJob = factory.updateOne(ResumeJob);
exports.deleteResumeJob = factory.deleteOne(ResumeJob);
