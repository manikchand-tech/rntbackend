// controllers/reviewController.js
const Review = require('../models/reviews.model');
const Rating = require('../models/Ratings.model')
const mongoose =require('mongoose')
const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReviewsForProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const reviews = await Review.find({ productId }).populate('customerId');
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const getReviewsForVendor = async (req, res) => {
    try {
        const { vendorId, ratingId, customerId } = req.params;

        // Convert ratingId string to ObjectId
       

       

        const reviews = await Review.find({ vendorId: vendorId, rating: ratingId,customerId:customerId }).populate('customerId');
        res.json(reviews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const checkIfCustomerHasSubmittedReview = async (customerId, ratingId) => {
    try {
        const reviewCount = await Review.countDocuments({ customerId, ratingId });
        return reviewCount > 0;
    } catch (error) {
        throw new Error('Error checking review status');
    }
};

const getReviewStatus = async (req, res) => {
    try {
        const { customerId, ratingId } = req.params;
        const review = await Review.findOne({ customerId:customerId, rating:ratingId });
        if (review) {
            res.json({ hasSubmittedReview: true, reviewId: review._id });
        } else {
            res.json({ hasSubmittedReview: false });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getReviewsForProduct,
    getReviewsForVendor,
    getReviewStatus,
    getAllReviews
};
