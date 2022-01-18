const Employer = require('../models/EmployerModel');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const signToken = require('../utils/signToken');
const factory = require('./handleFactory');

exports.signup = catchAsync(async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: 'employer',
  });

  user.password = undefined;

  const employer = await Employer.create({
    _id: user._id,
    companyName: req.body.companyName,
    position: req.body.position,
    location: req.body.location,
    phone: req.body.phone,
    fb: req.body.fb,
  });

  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    // secure: true, // exam https
    httpOnly: true, // not modified by browser
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  // 4. Log user in, send JWT
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output

  res.status(201).json({
    status: 'success',
    token,
    employer,
    user,
  });
});

exports.createEmployer = factory.createOne(Employer);
exports.getAllEmployer = factory.getAll(Employer);
exports.getEmployer = factory.getOne(Employer);
exports.updateEmployer = factory.updateOne(Employer);
exports.deleteEmployer = factory.deleteOne(Employer);
