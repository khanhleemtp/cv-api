const express = require('express');
const authController = require('../controllers/authController');
const followerController = require('../controllers/followerController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(followerController.getAllFollower)
  .post(
    authController.protect,
    followerController.setUser,
    followerController.createFollower
  );

// router
//   .route('/top-8-company')
//   .get(companyController.aliasTopCompany, companyController.getAllCompanies);

router
  .route('/:id')
  .patch(authController.protect, followerController.updateFollower)
  .delete(authController.protect, followerController.deleteFollower);

module.exports = router;
