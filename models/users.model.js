const mongoose = require('mongoose');

// Define a schema for the 'users' collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['admin', 'vendor', 'customer'],
        required: true
    },
    contactNumber: {
        type: String
    },
    address: {
        type: String
    },
    businessName: {
        type: String
    },
    businessAddress: {
        type: String
    },
    uniqueId: {
        type: String
    },
    vendorImage: {
        type: String
    },
    shopImages: {
        type: [String]
    },
    preferences: {
        type: String
    }
});

// Create a model for the 'users' collection
const User = mongoose.model('User', userSchema);

module.exports = User;
