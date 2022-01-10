const Follower = require('../models/FollowerModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');

// const filterObj = (obj, ...allowedFields) => {
//   const newObj = {};
//   Object.keys(obj).forEach((el) => {
//     if (allowedFields.includes(el)) newObj[el] = obj[el];
//   });
//   return newObj;
// };

exports.setUser = (req, res, next) => {
  // Allow nested routes
  if (req.user.id) req.body.user = req.user.id;
  next();
};

exports.createFollower = factory.createOne(Follower);
exports.getAllFollower = factory.getAll(Follower);
exports.getFollower = factory.getOne(Follower);
exports.updateFollower = factory.updateOne(Follower);
exports.deleteFollower = factory.deleteOne(Follower);
