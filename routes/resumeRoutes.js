const express = require('express');
const resumeController = require('../controllers/resumeController');
const authController = require('../controllers/authController');
const router = express.Router({ mergeParams: true });

// POST /users/234fad4/resumes/
// GET /users/234fad4/resumes/
// GET /users/1234/resumes
// GET /users/234fad4/resumes/123dc
// is match users/:userId/resumes

router
  .route('/')
  .get(
    resumeController.setQueryTitle,
    resumeController.setQuerySkill,
    resumeController.suggestJob,
    resumeController.getAllResumes
  )
  .post(
    authController.protect,
    authController.restrictTo('user', 'admin', 'company', 'employer'),
    resumeController.setUserIds,
    resumeController.createResume
  );

router
  .route('/:id')
  .get(resumeController.getResume)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'user', 'company'),
    resumeController.deleteResume
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'user', 'company'),
    resumeController.uploadImage,
    resumeController.handleAfterUpload,
    resumeController.updateResume
  );

module.exports = router;
