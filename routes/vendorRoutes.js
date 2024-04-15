const express = require('express');
const router = express.Router();
const vendorController = require('../Controllers/vendorController');

// Create a new vendor
router.post('/signup', vendorController.createVendor);

// Get all vendors
router.get('/', vendorController.getAllVendors);

// Get a vendor by ID
router.get('/:id', vendorController.getVendorById);

// Update a vendor by ID
router.put('/update/:id', vendorController.updateVendor);

// Delete a vendor by ID
router.delete('/delete/:id', vendorController.deleteVendor);
router.post('/login', vendorController.loginVendor);

router.get('/checkusername/:username', vendorController.checkUsername);
router.get('/checkemail/:email', vendorController.checkEmail);
router.get('/checkcontact/:contactNumber', vendorController.checkContact);
router.post('/verify/images/:id', vendorController.postImages);
module.exports = router;
