const express = require('express');
const path = require('path');
const cors = require('cors');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./controllers/errorController');

// Start express app
const app = express();

app.use(express.json());
app.enable('trust proxy');
app.options('*', cors());

app.get('/', (req, res) => {
  res.json({
    message: 'OK',
  });
});

app.use('/api/v1/users', require('./routes/userRoutes'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
