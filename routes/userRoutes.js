const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const resumeRouter = require('./resumeRoutes');

const router = express.Router();

// TODO PUBLIC_ROUTE
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);
router.post('/verify', authController.sendVerifiedToken);
router.get('/verify/:token', authController.verifiedToken);

// TODO PRIVATE_ROUTE
// protect all routes afer middleware
router.use(authController.protect);
router.patch('/updateMyPassword', authController.updatePassword);

// merge route
// router.use('/:userId/resumes', resumeRouter);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// TODO ADMIN_ROUTE
// only admin to access
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
