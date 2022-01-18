const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const filterObj = require('../utils/filterObj');

const updateNestedObjectParser = (nestedUpdateObject) => {
  const final = {};
  Object.keys(nestedUpdateObject).forEach((k) => {
    if (
      typeof nestedUpdateObject[k] === 'object' &&
      !Array.isArray(nestedUpdateObject[k])
    ) {
      const res = updateNestedObjectParser(nestedUpdateObject[k]);
      Object.keys(res).forEach((a) => {
        final[`${k}.${a}`] = res[a];
      });
    } else final[k] = nestedUpdateObject[k];
  });
  return final;
};

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

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // console.log(req.isObject);
    console.log('params', req.params.id);

    const data = req.body.isObject
      ? updateNestedObjectParser(req.body)
      : req.body;
    console.log('dataUpdate', data);

    const doc = await Model.findByIdAndUpdate(req.params.id, data, {
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

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    // const newTour = new Tour({});
    // newTour.save()

    // let data = req.body;
    // if (allowedFields.length > 0) data = filterObj(data, ...allowedFields);

    // const filterObj = (obj, ...allowedFields) => {
    //   const newObj = {};
    //   Object.keys(obj).forEach((el) => {
    //     if (allowedFields.includes(el)) newObj[el] = obj[el];
    //   });
    //   return newObj;
    // };

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

exports.getAll = (Model, parseQuery = false) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET resumes on users (hack)
    // let filter = {};
    // if (req.params.userId) filter = { user: req.params.userId };
    // console.log(req.query);
    // TODO QUERY
    console.log('query here', req.query);

    const features = new APIFeatures(Model.find(), req.query, parseQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const doc = await features.query.explain();
    const doc = await features.query;
    const notPanigate = new APIFeatures(Model.find(), req.query, parseQuery)
      .filter()
      .sort();

    const total = await notPanigate.query;

    // TODO SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
      total: total.length,
    });
  });
