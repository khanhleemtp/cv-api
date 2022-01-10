const ResumeJob = require('../models/ResumeJobModel');

const factory = require('./handleFactory');

exports.createResumeJob = factory.createOne(ResumeJob);
exports.getAllResumeJob = factory.getAll(ResumeJob);
exports.getResumeJob = factory.getOne(ResumeJob);
exports.updateResumeJob = factory.updateOne(ResumeJob);
exports.deleteResumeJob = factory.deleteOne(ResumeJob);
