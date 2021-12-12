const AppError = require('../utils/AppError');

const handleObjectId = (err) => {
  return new AppError(
    `Thông tin không hợp lệ:  ${err.path}: ${err.value} `,
    400
  );
};

const handleDuplicateFieldsDB = (err) => {
  let value = Object.values(err.keyValue).join(' ');
  return new AppError(`${value} đã có, hãy nhập lại `, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  console.log(errors);
  const message = `Thông tin không hợp lệ: ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = (err) =>
  new AppError('Token không hợp lệ. Hãy đăng nhập lại', 401);

const handleTokenExpiredError = (err) =>
  new AppError('Token đã hết hạn, hãy đăng nhập lại', 401);

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programing or other unknown error error: don't leak error details
  } else {
    // 1, Log Error
    console.error('ERROR 💥', err);

    // 2, Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Bạn đã làm sai gì đó 😐',
    });
  }
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = {};

    if (err.name === 'CastError') error = handleObjectId(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (err.name === 'TokenExpiredError') error = handleTokenExpiredError(err);
    if (Object.keys(error).length === 0) {
      return sendErrorProd(err, res);
    }
    sendErrorProd(error, res);
  }
};
