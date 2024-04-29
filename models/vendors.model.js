const mongoose = require('mongoose');

// Define the vendor schema
const vendorSchema = new mongoose.Schema({
    vendorName: { type: String, required: true },
    username: { type: String,unique:true, required: true },
    email: { type: String,unique:true, required: true },
    password: { type: String, required: true },
    businessName: { type: String, required: true },
    businessAddress: {
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        district: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true }
    },
    businessType: { type: String, enum: ['reachit', 'thinkit'], required: true },
    contactNumber: { type: String,unique:true, required: true },
    vendorImage: { type: String, default:""},
    shopImage: { type: String, default:"" },
    verificationStatus: { type: String, default: 'not verified' },
    role: {
        type: String,
        default: 'vendor'
    },
    createdAt: {
        type: Date,
        default: Date.now}

});

// Create a Vendor model based on the schema
const Vendor = mongoose.model('Vendor', vendorSchema);

// Export the Vendor model
module.exports = Vendor;
