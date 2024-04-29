const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  rating: { type: Number, required: true },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    
}


});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
