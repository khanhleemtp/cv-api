const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router.route('/').get(jobController.getAllJob).post(jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    jobController.deleteJob
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    jobController.updateJob
  );

module.exports = router;
