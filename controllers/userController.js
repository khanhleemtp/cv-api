const User = require('../models/UserModel');
const Notification = require('../models/NotificationModel');

const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const { profileImage } = require('../utils/upload');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.viewNoti = catchAsync(async (req, res, next) => {
  const newNoti = await Notification.updateMany(
    { user: req.user.id, view: false },
    { $set: { view: true } },
    { new: true, runValidators: false }
  );
  console.log(newNoti);

  res.status(200).json({
    status: 'success',
    data: newNoti.ok,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1. Create error if user POST password data
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password update, please use /updateMyPassword'
      ),
      400
    );
  }

  // 2. Filter fields allow updates
  const filteredBody = filterObj(req.body, 'name', 'email', 'photo');

  // 3. Update user document

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not not defined! Please sign up',
  });
};

exports.uploadImage = profileImage.single('photo');

exports.handleAfterUpload = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  const photo = req.file.location;
  req.params.id = req.user.id;
  req.body.photo = photo;
  req.body.isObject = true;
  // console.log(req.body);
  next();
});
// Do NOT update with this

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
