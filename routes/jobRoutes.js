const express = require('express');
const jobController = require('../controllers/jobController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(jobController.setQueryTitle, jobController.getAllJob)
  .post(
    authController.protect,
    authController.restrictTo('employer'),
    jobController.setEmployer,
    jobController.createJob
  );

router
  .route('/:id')
  .get(jobController.getJob)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    jobController.deleteJob
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    jobController.updateJob
  );

module.exports = router;
