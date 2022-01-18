const express = require('express');
const authController = require('../controllers/authController');
const employerController = require('../controllers/employerController');
// const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .post(employerController.signup)
  .get(authController.protect, employerController.getAllEmployer);
router
  .route('/:id')
  .get(employerController.getEmployer)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    employerController.updateEmployer
  );

module.exports = router;
