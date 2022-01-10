// libray external
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');

// internal
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');
const { profileImage } = require('./utils/upload');

// Start express app
const app = express();

// Implement CORS
app.enable('trust proxy');
// Access-Control-Allow-Origin *
// api.ld.com, front-end ld.com

app.use(cors());

// app.options('*', cors());
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
// app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// HPP Helpfull
app.use(compression());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'OK',
  });
});

app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/resumes', require('./routes/resumeRoutes'));
app.use('/api/v1/employers', require('./routes/employerRoutes'));
app.use('/api/v1/followers', require('./routes/followerRoutes'));

app.use('/api/v1/companies', require('./routes/companyRoutes'));

app.post('/api/v1/upload', profileImage.single('photo'), (req, res, err) => {
  try {
    return res.send(req.file);
  } catch (err) {
    return res.send(400);
  }
});

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

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
