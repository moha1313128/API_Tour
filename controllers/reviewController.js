const Review = require('./../models/reviewModel');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
    // Allow Nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
};

exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.createReview = factory.createOne(Review);
exports.getReview = factory.getOne(Review);
exports.getAllReviews = factory.getAll(Review);

