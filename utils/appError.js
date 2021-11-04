class AppError extends Error {
  constructor(message, statusCode) {
    // because message buiding Error constructor
    super(message);
    this.statusCode = statusCode;
    // status depend on statusCode
    this.status = `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    // application bug
    this.isOperational = true;

    // khi tạo 1 AppError instance -> contructor -> run func -> err.stack
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
