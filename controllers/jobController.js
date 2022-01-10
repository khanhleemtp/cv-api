const Job = require('../models/JobModel');

const factory = require('./handleFactory');

exports.createJob = factory.createOne(Job);
exports.getAllJob = factory.getAll(Job);
exports.getJob = factory.getOne(Job);
exports.updateJob = factory.updateOne(Job);
exports.deleteJob = factory.deleteOne(Job);
