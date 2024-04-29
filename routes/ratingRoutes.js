const express = require('express');
const router = express.Router();
const ratingController = require('../Controllers/ratingController.js');


// Get rating for a vendor's product
router.get('/get-rating/:vendorId/:productId', ratingController.getRating);

// Create a new rating for a vendor's product
router.post('/product/:productId', ratingController.createRating);

// Update a rating for a vendor's product
router.put('/update-product-rating/:vendorId/:productId', ratingController.updateRating);

// Delete a rating for a vendor's product
router.delete('/delete-product-rating/:vendorId/:productId',ratingController.deleteRating);



// Check if a customer has rated a vendor
router.post('/vendor/:vendorId', ratingController.submitRating);

// Route to get the average rating
router.get('/average-rating/vendor/:vendorId', ratingController.getAverageRating);

router.get('/you-rated/vendor/:vendorId/:customerId', ratingController.getuserating);
router.get('/you-rated/product/:productId/:customerId', ratingController.getRating);
router.get('/average-rating/product/:productId', ratingController.getProductAverageRating);

module.exports = router;