const express = require('express');
const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(notificationController.getAllNotification)
  .post(notificationController.createNotification);

router
  .route('/:id')
  .get(notificationController.getNotification)
  .delete(authController.protect, notificationController.deleteNotification)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    notificationController.updateNotification
  );

module.exports = router;
