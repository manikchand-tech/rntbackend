// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const reviewController = require('../Controllers/reviewController');

router.post('/submit', reviewController.createReview);
router.put('/update/:id', reviewController.updateReview);
router.delete('/delete/:id', reviewController.deleteReview);
router.get('/products/:productId/reviews', reviewController.getReviewsForProduct);
router.get('/vendors/:vendorId/ratings/:ratingId/customer/:customerId', reviewController.getReviewsForVendor);
router.get('/status/customer/:customerId/rating/:ratingId',reviewController.getReviewStatus)
router.get('/',reviewController.getAllReviews)
module.exports = router;
