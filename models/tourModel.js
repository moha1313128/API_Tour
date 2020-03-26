const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Name is required'],
        trim: true
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'Name is required']
    },
    difficulty: {
        type: String,
        required: [true, 'Name is required']
    },
    rating: {
        type: Number,
        default: 0.0
    },
    ratingAverage: {
        type: Number,
        default: 4.5
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    priceDiscount: Number,
    summary: {
        type: String,
        trim: true,
        required: [true, 'Price is required']
    },
    discription: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'Price is required']
    },
    images: [String],
    createAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;