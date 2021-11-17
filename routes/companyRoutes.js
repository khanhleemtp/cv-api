const express = require('express');
const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(companyController.getAllCompany)
  .post(companyController.createCompany);

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
