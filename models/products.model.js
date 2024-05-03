const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: { type: String },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Vendor',
        required: true
    }

});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
