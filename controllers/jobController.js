const Job = require('../models/JobModel');
const slugify = require('slugify');

const factory = require('./handleFactory');

exports.setQueryTitle = (req, res, next) => {
  // Allow nested routes
  console.log('query', req.query);
  if (req.query.skills) {
    console.log(Array.from(String(req.query.skills).split(',')));
    req.query.skills = {
      $in: Array.from(String(req.query.skills).split(',')),
    };
  }
  if (req.query.slug) {
    const s = slugify(req.query.slug, { lower: true, locale: 'vi' });
    const regex = new RegExp(s, 'i'); // i for case insensitive
    req.query.slug = { $regex: regex };
  }
  if (req.query.to && req.query.to.gte) {
    req.query.to = {
      $gte: req.query.to.gte,
    };
  }
  if (req.query.to && req.query.to.lte) {
    req.query.to = {
      $lte: req.query.to.lte,
    };
  }
  next();
};

exports.createJob = factory.createOne(Job);
exports.getAllJob = factory.getAll(Job, true);
exports.getJob = factory.getOne(Job);
exports.updateJob = factory.updateOne(Job);
exports.deleteJob = factory.deleteOne(Job);
