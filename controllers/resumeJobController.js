const ResumeJob = require('../models/ResumeJobModel');
const Employer = require('../models/EmployerModel');
const Notification = require('../models/NotificationModel');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/UserModel');

const factory = require('./handleFactory');

exports.formatFindJob = (req, res, next) => {
  if (req.query.resume && req.query.resume.in) {
    req.query.resume = {
      $in: Array.from(String(req.query.resume.in).split(',')),
    };
  }
  next();
};

exports.applyJob = catchAsync(async (req, res, next) => {
  const doc = await ResumeJob.create(req.body);
  // Tour.findOne({ _id: req.params.id })
  if (req.body.company) {
    const listEmployer = await Employer.find({ company: req.body.company });
    if (listEmployer) {
      listEmployer.forEach(async (employer) => {
        await Notification.create({
          user: employer.id,
          message: `Ứng viên ${req.body.name} đã ứng tuyển vào vị trí ${req.body.title}`,
          notifyType: 'user',
          link: `/company/campaign/${req.body.job}`,
        });
      });
    }
  }
  res.status(201).json({
    status: 'success',
    data: doc,
  });
});

exports.updateResumeJob = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const doc = await ResumeJob.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('Không tìm thấy tài liệu nào có ID đó', 404));
  }

  if (req.body.companyName) {
    await Notification.create({
      user: req.body.user,
      message: `Công ty ${req.body.companyName} đã ${req.body.status} yêu cầu ứng tuyển vào vị trí ${req.body.title}`,
      notifyType: 'user',
      link: `/job-page/${req.body.job}`,
    });
    const user = await User.findById(req.body.user);
    if (!user) {
      return next(new AppError('Không tìm thấy người dùng'));
    }
    await new Email(
      user,
      `${process.env.DOMAIN_LOCAL}/job-page/${req.body.job}`,
      `Công ty ${req.body.companyName} đã ${req.body.status} yêu cầu ứng tuyển vào vị trí ${req.body.title}`
    ).sendResponseApply();
  }

  res.status(200).json({
    status: 'success',
    data: doc,
  });
});

exports.createResumeJob = factory.createOne(ResumeJob);
exports.getAllResumeJob = factory.getAll(ResumeJob);
exports.getResumeJob = factory.getOne(ResumeJob);
// exports.updateResumeJob = factory.updateOne(ResumeJob);
exports.deleteResumeJob = factory.deleteOne(ResumeJob);
