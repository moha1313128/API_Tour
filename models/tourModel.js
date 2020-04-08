const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
        maxlength: [40, 'A tour name must have less or equal then 40 characters'],
        minlength: [10, 'A tour name must have great or equal then 10 characters'],
        // validate: [validator.isAlpha, 'Tour name must only contain characters']
    },
    slug: {
        type: String
    },
    duration: {
        type: Number,
        required: [true, 'duration is required'],
        trim: true
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'maxGroupSize is required']
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is required'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty is either: easy, medium, difficult',
        }
    },
    rating: {
        type: Number,
        default: 0.0
    },
    ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10
    },
    ratingQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                // this only points to current doc on new document creation
                return val < this.price;
            },
            message: 'Discount price ({VALUE}) should be below regular price',
        }
    },
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
    secretTour: {
        type: Boolean,
        default: false
    },
    startLocation: {
        // GeoJSON
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [
        {
            type: {
                String,
                default: 'Point',
                enum: ['Point']
            },
            coordinates: [Number],
            type: String,
            address: String,
            description: String,
            day: Number
        }
    ],
    // For Embeding
    // guides: Array,
    //For Refer
    guides: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'This is the guides section']
        }
    ],
    // reviews: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'review'
    // }
});

tourSchema.index({ slug: 1 });
tourSchema.index({ price: 1, ratingAverage: -1 });
tourSchema.index({ startLocation: '2dsphere' });

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;

});
// DOCUMENT MIDLLEWARE > HOOKs / run before .save() and .create()
tourSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});
// tourSchema.pre('save', function (next) {
//     console.log('Will Save The Document....');
//     next();
// });
// tourSchema.post('save', function (doc, next) {
//     console.log(doc);
//     next();
// });

// Query Middleware
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } });
    this.start = Date.now();
    next();
});

tourSchema.post(/^find/, function (docs, next) {
    console.log(`Query took ${Date.now() - this.start} milliseconds!`);
    // console.log(docs);
    next();
});

// Aggregation Midlleware
// tourSchema.pre('aggregate', function (next) {
//     this.pipeline().unshift({
//         $match: { secretTour: { $ne: true } }
//     });
//     console.log(this.pipeline());
//     next();
// });

// Modelling Tour Guides Embedding
// tourSchema.pre('save', async function (next) {
//     const guidesPromises = this.guides.map(async id => await User.findById(id));
//     this.guides = await Promise.all(guidesPromises);
//     next();
// });

//  Modelling Tour Guides Child Referencing
//  Populating Tour Guides
tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v -passwordChangedAt'
    });
    next();
});

// Virtual Populate
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id',
});

tourSchema.set('toObject', { virtuals: true });
tourSchema.set('toJSON', { virtuals: true });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;