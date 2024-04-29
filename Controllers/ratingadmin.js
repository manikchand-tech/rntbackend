const { ObjectId } = require('mongoose').Types;
const Rating = require('../models/Ratings.model');

exports.getCustomersWithRatings = async (vendorId) => {
    try {
        const ratings = await Rating.find({ vendorId: new ObjectId(vendorId) }).maxTimeMS(30000); // Set timeout to 30 seconds
        console.log('Ratings:', ratings); // Log ratings for debugging
        const uniqueCustomerIds = [...new Set(ratings.map(rating => rating.customerId.toString()))]; // Get unique customerIds
        return uniqueCustomerIds;
    } catch (error) {
        console.error('Error fetching customer ratings:', error);
        return [];
    }
};

// Usage
