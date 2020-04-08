const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRoute = require('./reviewRoute');

// POST /tour/id/reviews
// GET /tour/id/reviews 
// GET /tour/id/reviews/id
// router.route('/:tourId/reviews')
// .post(authController.protect, authController.restrictTo('user'), reviewController.createReview);

// Nested route with express js
router.use('/:tourId/reviews', reviewRoute);

router.route('/top-5-cheap').get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthy-plan/:year').get(tourController.getMonthyPlan, authController.restrictTo('admin', 'lead-guide', 'guide'));

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour,
    authController.restrictTo('admin', 'lead-guide'))
  .delete(authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour);

module.exports = router;
