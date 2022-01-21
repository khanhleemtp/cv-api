const mongoose = require('mongoose');
const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    message: {
      type: String,
    },
    link: {
      type: String,
    },
    view: {
      type: Boolean,
      default: false,
    },
    notifyType: {
      type: 'String',
      enum: ['system', 'user', 'employer', 'company'],
      default: 'system',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
