const Notification = require('../models/NotificationModel');

const factory = require('./handleFactory');

exports.createNotification = factory.createOne(Notification);
exports.getAllNotification = factory.getAll(Notification);
exports.getNotification = factory.getOne(Notification);
exports.updateNotification = factory.updateOne(Notification);
exports.deleteNotification = factory.deleteOne(Notification);
