const express = require('express');
const resumeJobController = require('../controllers/resumeJobController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(resumeJobController.getAllResumeJob)
  .post(resumeJobController.createResumeJob);

router
  .route('/:id')
  .get(resumeJobController.getResumeJob)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    resumeJobController.deleteResumeJob
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    resumeJobController.updateResumeJob
  );

module.exports = router;
