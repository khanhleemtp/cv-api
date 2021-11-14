const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    height: {
      type: Number,
    },
    title: {
      type: String,
      default: 'IT CV',
    },
    email: {
      type: String,
      default: 'abc@gmail.com',
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    link: {
      type: String,
    },
    height: Number,
    showTitle: {
      type: Boolean,
      default: true,
    },
    showPhone: {
      type: Boolean,
      default: true,
    },
    showLink: {
      type: Boolean,
      default: true,
    },
    showEmail: {
      type: Boolean,
      default: true,
    },
    showLocation: {
      type: Boolean,
      default: true,
    },
    uppercaseName: {
      type: Boolean,
      default: true,
    },
    showPhoto: {
      type: Boolean,
      default: true,
    },
    photoStyle: {
      type: String,
      default: 'rounded',
    },
    photo: {
      type: String,
      default: 'user.jpg',
    },
  },
  {
    _id: false,
  }
);

module.exports = headerSchema;
