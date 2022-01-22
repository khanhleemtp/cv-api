const ResumeJob = require('../models/ResumeJobModel');
const Job = require('../models/JobModel');
const Company = require('../models/CompanyModel');
const mongoose = require('mongoose');
const Employer = require('../models/EmployerModel');
const Notification = require('../models/NotificationModel');
const Email = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User = require('../models/UserModel');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

const keyBy = require('lodash/keyBy');

const factory = require('./handleFactory');

exports.getResumeInCompany = catchAsync(async (req, res, next) => {
  const jobIds = await Job.aggregate([
    {
      $match: { company: mongoose.Types.ObjectId(req.query.company) },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);
  const ids = jobIds.map((job) => mongoose.Types.ObjectId(job._id));
  console.log(ids);
  let data = await ResumeJob.aggregate([
    {
      $match: {
        job: { $in: ids },
        created_at: {
          $gte: 'Mon May 30 18:47:00 +0000 2015',
          $lt: 'Sun May 30 20:40:36 +0000 2010',
        },
      },
    },
    {
      $group: {
        _id: '$response',
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(201).json({
    status: 'success',
    data,
    ids,
  });
});

exports.getInfoChartJob = catchAsync(async (req, res, next) => {
  var start = new Date(req.query.from);
  var end = new Date(req.query.to);

  const day = moment.range(start, end);
  const diff = day.diff('days');
  console.log(diff);

  let step = 1;
  if (diff > 6) step = diff / 6;

  const rangeDate = Array.from(day.by('day', { step }));

  let arrDate = rangeDate.map((date) => date.toISOString());

  let finalData = await Promise.all(
    arrDate.map(async (date) => {
      const info = await ResumeJob.aggregate([
        {
          $match: {
            job: mongoose.Types.ObjectId(req.query.id),
            createdAt: {
              $gte: moment(date).startOf('day').toDate(),
              $lte: moment(date).endOf('day').toDate(),
            },
          },
        },
        {
          $group: {
            _id: '$response',
            count: { $sum: 1 },
          },
        },
      ]);
      console.log(keyBy(info, '_id'));
      return {
        [moment(date).format('DD-MM')]: keyBy(info, '_id'),
      };
    })
  );

  // let data = await ResumeJob.aggregate([
  //   {
  //     $match: {
  //       job: mongoose.Types.ObjectId(req.query.id),
  //       createdAt: {
  //         $gte: new Date(req.query.from),
  //         $lte: new Date(req.query.to),
  //       },
  //     },
  //   },
  //   {
  //     $group: {
  //       _id: '$response',
  //       count: { $sum: 1 },
  //     },
  //   },
  // ]);

  res.status(201).json({
    status: 'success',
    data: finalData,
  });
});

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
