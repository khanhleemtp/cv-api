// libray external
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

// internal
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const { profileImage } = require('./utils/upload');
const catchAsync = require('./utils/catchAsync');

// Start express app
const app = express();

// Implement CORS
app.enable('trust proxy');
// Access-Control-Allow-Origin *
// api.ld.com, front-end ld.com
const allowList = [
  'http://ld-datn-client.s3-website-ap-southeast-1.amazonaws.com',
  'http://localhost:3000',
];

var corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.options('*', cors());
// app.options('/api/v1/users/:id', cors());

// Set security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan('dev'));

// Limit requests from same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// HPP Helpfull
app.use(compression());

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/resumes', require('./routes/resumeRoutes'));

app.use('/api/v1/companies', require('./routes/companyRoutes'));

app.post(
  '/api/v1/upload',
  profileImage.single('profileImage'),
  (req, res, err) => {
    try {
      return res.send(req.file);
    } catch (err) {
      return res.send(400);
    }
  }
);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
