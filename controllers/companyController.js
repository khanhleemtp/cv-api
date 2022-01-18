const Company = require('../models/CompanyModel');
const Employer = require('../models/EmployerModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const omit = require('lodash/omit');
const { profileImage } = require('../utils/upload');
const slugify = require('slugify');

const factory = require('./handleFactory');

exports.setHost = (req, res, next) => {
  // Allow nested routes
  if (req.user.id) req.body.host = req.user.id;
  next();
};

exports.removeStatus = (req, res, next) => {
  // Allow nested routes
  if (req.body.status && req.user.role !== 'admin') {
    req.body = omit(req.body, 'status');
  }
  next();
};

exports.checkPermission = (req, res, next) => {
  if (req.user.id === req.body.host || req.user.role === 'admin') {
    return next();
  }
  return next(new AppError('Bạn không có quyền thực hiện hành động này', 403));
};

exports.checkResponseCompany = catchAsync(async (req, res, next) => {
  if (req.body.status === 'reject') {
  }
  if (req.body.status === 'accept') {
    await Employer.findByIdAndUpdate(req.body.host, {
      company: req.params.id,
      active: true,
    });
  }
  next();
});

exports.setQueryName = (req, res, next) => {
  // Allow nested routes

  if (req.query.slug) {
    const s = slugify(req.query.slug, { lower: true, locale: 'vi' });
    const regex = new RegExp(s, 'i'); // i for case insensitive
    req.query.slug = { $regex: regex };
  }

  next();
};

exports.uploadImage = profileImage.single('logo');
exports.handleAfterUpload = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const logo = req.file.location;
  req.body.logo = logo;
  req.body.isObject = true;
  // console.log(req.body);
  next();
});

exports.createCompany = factory.createOne(Company);
exports.getAllCompany = factory.getAll(Company, true);
exports.getCompany = factory.getOne(Company);
exports.updateCompany = factory.updateOne(Company);
exports.deleteCompany = factory.deleteOne(Company);
