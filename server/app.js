const express = require('express');
const path = require('path');

// Start express app
const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.get('/', (req, res) => {
  res.json({
    message: 'OK',
  });
});

module.exports = app;
