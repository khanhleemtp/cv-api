const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide valid  your emmail'],
    },
    password: {
      type: String,
      required: [true, 'Please provide your password'],
      minlength: [4, 'Password must be at least 4 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'hr', 'company', 'admin'],
      default: 'user',
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

// userSchema.virtual('company', {
//   ref: 'Company',
//   foreignField: 'user',
//   localField: '_id',
//   justOne: true,
// });

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
  this.find({
    active: {
      $ne: false,
    },
  });
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
  const resetToken = crypto.randomBytes(32).toString('hex');
  // sendt to user
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
