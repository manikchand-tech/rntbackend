
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    rating: { type: mongoose.Schema.Types.ObjectId, ref: 'rating', required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
