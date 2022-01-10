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
// router
//   .route('/top-8-company')
//   .get(companyController.aliasTopCompany, companyController.getAllCompanies);

// router
//   .route('/:id')
//   .get(companyController.getCompany)
//   .post(
//     authController.protect,
//     authController.restrictTo('admin'),
//     companyController.acceptCompany
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo('admin', 'company'),
//     companyController.deleteCompany
//   )
//   .patch(
//     authController.protect,
//     authController.restrictTo('admin', 'company'),
//     companyController.updateCompany
//   );

module.exports = router;
