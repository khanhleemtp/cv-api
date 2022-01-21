const express = require('express');
const resumeJobController = require('../controllers/resumeJobController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(resumeJobController.formatFindJob, resumeJobController.getAllResumeJob)
  .post(resumeJobController.applyJob);

router
  .route('/:id')
  .get(resumeJobController.getResumeJob)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    resumeJobController.deleteResumeJob
  )
  .patch(authController.protect, resumeJobController.updateResumeJob);

module.exports = router;
