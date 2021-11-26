const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    height: {
      type: Number,
    },
    email: {
      type: String,
      default: 'abc@gmail.com',
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    link: {
      type: String,
    },
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
    showAddress: {
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
