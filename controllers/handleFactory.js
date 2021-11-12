const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('Không tìm thấy tài liệu nào có ID đó', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model, pickArr) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // return newDocument
      runValidators: true,
      // if false not run validation document
    });

    if (!doc) {
      return next(new AppError('Không tìm thấy tài liệu nào có ID đó', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.createOne = (Model, pickArr) =>
  catchAsync(async (req, res) => {
    // const newTour = new Tour({});
    // newTour.save()
    const doc = await Model.create(req.body);
    // Tour.findOne({ _id: req.params.id })

    res.status(201).json({
      status: 'success',
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('Không tìm thấy tài liệu nào có ID đó', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET resumes on users (hack)
    let filter = {};
    if (req.params.userId) filter = { user: req.params.userId };
    // console.log(req.query);
    // TODO QUERY
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    const notPanigate = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields();
    const total = await notPanigate.query;

    // TODO SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
      total: total.length,
    });
  });
