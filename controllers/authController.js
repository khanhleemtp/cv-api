const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Email = require('../utils/email');
const signToken = require('../utils/signToken');

// TODO SEND_TOKEN
const createSendToken = (user, statusCode, res) => {
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
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
  });
};

// TODO SIGN_UP
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const url = `${req.protocol}://${req.get('host')}/me`;

  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, res);
});

// TODO LOGIN
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1, Check if email if exist
  if (!email || !password) {
    return next(new AppError('Không tìm thấy người dùng', 400));
  }

  // 2, Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Sai thông tin tài khoản hoặc mật khẩu', 401));
  }
  // 3, If everything ok, send token to client
  createSendToken(user, 200, res);
});

// TODO PROTECT_ROUTE
exports.protect = catchAsync(async (req, res, next) => {
  // 1. Getting token and check of it's the same
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(new AppError('Vui lòng đăng nhập', 401));

  // 2. Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if user still exists
  const currentUser = await User.findById(decoded.id).select(
    '-passwordChangedAt'
  );

  if (!currentUser) {
    return next(new AppError('Người dùng không tồn tại'), 401);
  }

  // 4. Check user changed password after token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'Gần đây, bạn đã thay đổi mật khẩu! Xin vui lòng đăng nhập lại',
        401
      )
    );
  }

  // GRAND ACCESS PROTECTED ROUTE
  req.user = currentUser;
  next();
});

// TODO RESTRICT_ROLE_USER
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('Bạn không có quyền thực hiện hành động này', 403)
      );
    }
    next();
  };
};

// TODO SEND_VERIFIED_TOKEN

exports.sendVerifiedToken = catchAsync(async (req, res, next) => {
  // 1, Find User
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Không tìm thấy địa chỉ email'), 401);
  }
  if (user.verify) {
    return next(new AppError('Người dùng đã xác thực'), 401);
  }
  // 2, Generate the random verified token
  const verifiedToken = user.createVerifiedToken();

  await user.save({ validateBeforeSave: false });

  // 3, Send it to user's email
  const verifyURL = `${process.env.DOMAIN_LOCAL}/verify?token=${verifiedToken}&role=${user.role}`;
  console.log(verifyURL);
  // const message = `Vui lòng ấn vào đường dẫn để xác thực tài khoản: ${verifyURL}. \n`;
  try {
    // await sendEmail({
    //   email: user.email,
    //   subject: 'Xác minh mã thông báo đặt lại (có giá trị trong 10 phút)',
    //   message,
    // });
    await new Email(user, verifyURL).sendVerifiedToken();

    res.status(200).json({
      status: 'success',
      message: 'Mã xác thực đã được gửi đến email',
    });
  } catch (error) {
    console.log(error);
    user.verifiedToken = undefined;
    user.verifiedTokenExpires = undefined;
    await user.save();
    return next(
      new AppError('Hãy thử gửi lại yêu cầu xác thực tài khoản'),
      400
    );
  }
});

// TODO VERIFIED_TOKEN
exports.verifiedToken = catchAsync(async (req, res, next) => {
  // const hashedToken = crypto
  //   .createHash('sha256')
  //   .update(req.params.token)
  //   .digest('hex');
  // 2. If token has no expired, and there is user, set new password

  // 1. Get user based on the token
  const user = await User.findOne({
    verifiedToken: req.params.token,
    verifiedTokenExpires: {
      $gte: Date.now(),
    },
  });

  if (!user) {
    return next(
      new AppError('Không tìm thấy người dùng hoặc mã xác thực đã hết hạn', 401)
    );
  }

  user.verify = true;
  user.verifiedToken = undefined;
  user.verifiedTokenExpires = undefined;

  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Bạn đã xác thực thành công',
  });
});

// TODO FORGOT_PASSWORD
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1, Get user based on POSTed email address
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Không tìm thấy người dùng'), 401);
  }
  // 2, Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3, Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/reset-password/${resetToken}`;

  const message = `Gửi yêu cầu mật khẩu mới tới ${resetURL}. \n Nếu bạn không quên mật khẩu của mình, vui lòng bỏ qua email`;
  try {
    // await sendEmail({
    //   email: user.email,
    //   subject:
    //     'Mã thông báo đặt lại mật khẩu của bạn (có giá trị trong 10 phút)',
    //   message,
    // });

    await new Email(user, verifyURL).sendPasswordReset();

    res
      .status(200)
      .json({ status: 'success', message: 'Yêu cầu đã được gửi tới email' });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return next(new AppError('Hãy thử gửi lại yêu cầu'), 400);
  }
});

//

// TODO RESET_PASSWORD
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on the token

  // const hashedToken = crypto
  //   .createHash('sha256')
  //   .update(req.params.token)
  //   .digest('hex');

  // 2. If token has no expired, and there is user, set new password
  const user = await User.findOne({
    passwordResetToken: req.params.token,
    passwordResetExpires: {
      $gte: Date.now(),
    },
  });

  if (!user) {
    return next(
      new AppError('Không tìm thấy người dùng hoặc yêu cầu đã hết hạn', 401)
    );
  }
  const password = req.body.password;
  user.password = password;
  user.passwordResetExpires = undefined;
  user.passwordResetToken = undefined;
  await user.save();

  // 3. Update changedPasswordAt property for the user

  // 4. Log the user in, send JWT
  createSendToken(user, 200, res);
});

// TODO UPDATE_PASSWORD
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1. Get user from collection
  const user = await User.findById(req.user.id).select('+password');
  // 2. Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Mật khẩu hiện tại không chính xác', 401));
  }
  // 3. If so, update password
  user.password = req.body.password;
  await user.save();
  // User.findByIdAndUpdate not working

  // 4. Log user in, send JWT
  createSendToken(user, 200, res);
});

exports.setUser = (req, res, next) => {
  // Allow nested routes
  if (req.user.id) req.params.user = req.user.id;
  next();
};
