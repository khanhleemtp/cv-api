const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const createToken = require('../utils/createToken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vui lòng cho chúng tôi biết tên của bạn'],
    },
    email: {
      type: String,
      required: [true, 'Vui lòng cung cấp địa chỉ email của bạn'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Vui lòng cung cấp email hợp lệ của bạn'],
    },
    photo: String,
    password: {
      type: String,
      required: [true, 'Vui lòng cung cấp mật khẩu của bạn'],
      minlength: [4, 'Mật khẩu phải có ít nhất 4 ký tự'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'employer', 'company', 'admin'],
      default: 'user',
    },
    passwordChangedAt: {
      type: Date,
      select: false,
    },
    savedJobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Job',
      },
    ],
    passwordResetToken: String,
    passwordResetExpires: Date,
    verify: {
      type: Boolean,
      default: false,
    },
    isSendMail: {
      type: Boolean,
      default: false,
    },
    verifiedToken: String,
    verifiedTokenExpires: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual('employer', {
  ref: 'Employer',
  foreignField: '_id',
  localField: '_id',
  justOne: true,
});

userSchema.virtual('listCv', {
  ref: 'Resume',
  foreignField: 'user',
  localField: '_id',
  justOne: false,
});

userSchema.virtual('notifications', {
  ref: 'Notification',
  foreignField: 'user',
  localField: '_id',
  justOne: false,
});

// userSchema.virtual('applies', {
//   ref: 'Apply',
//   foreignField: 'user',
//   localField: '_id',
// });

userSchema.pre('save', async function (next) {
  // Only run function if password was actually modified

  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // this points to current query
  this.populate([
    {
      path: 'savedJobs',
    },
    {
      path: 'listCv',
    },
    {
      path: 'notifications',
    },
  ]);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000);

    return changedTimestamp > JWTTimestamp; // 200 > 100
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // send to user
  const resetToken = createToken();
  this.passwordResetToken = resetToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.createVerifiedToken = function () {
  // sendt to user
  const verifiedToken = createToken();
  this.verifiedToken = verifiedToken;
  this.verifiedTokenExpires = Date.now() + 10 * 60 * 1000;
  return verifiedToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
