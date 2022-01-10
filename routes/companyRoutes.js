const express = require('express');
const authController = require('../controllers/authController');
const companyController = require('../controllers/companyController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(companyController.setQueryName, companyController.getAllCompany)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    companyController.setHost,
    companyController.removeStatus,
    companyController.createCompany
  );

router
  .route('/:id')
  .get(companyController.getCompany)

  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    companyController.deleteCompany
  )
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'employer'),
    companyController.uploadImage,
    companyController.handleAfterUpload,
    companyController.checkPermission,
    companyController.removeStatus,
    companyController.checkResponseCompany,
    companyController.updateCompany
  );

module.exports = router;
