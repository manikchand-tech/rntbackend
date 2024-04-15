const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/vendors.model'); // Assuming your model file is named 'vendor.js'
const crypto = require('crypto');
// OtherFile.js

const secretKey = require('./GenerateSecretKey');

// Use the secretKey variable in your code
console.log('Secret key vendor:', secretKey);

// Create a new vendor
const createVendor = async (req, res) => {
    try {
        const { vendorName, username, password, businessName, businessAddress, businessType, contactNumber, email, vendorImage, shopImage } = req.body;
        const vendor = new Vendor({ vendorName, username, password, businessName, businessAddress, businessType, contactNumber, email, vendorImage, shopImage });
        const existingUser = await Vendor.findOne({ username: req.body.username });
        const existingEmail = await Vendor.findOne({ email: req.body.email });
        const existingContact = await Vendor.findOne({ contactNumber: req.body.contactNumber });
        if (existingUser) {
            return res.status(409).send('Username already taken');
        }
        if (existingEmail) {
            return res.status(409).send('Email already registered');
        }
        if (existingContact) {
            return res.status(409).send('contact is already in use');
        }

        await vendor.save();
        res.status(201).json({ message: 'Signup successful' });

    } catch (error) {

        res.status(400).json({ message: error.message });
    }
};

// Login a vendor
const loginVendor = async (req, res) => {

    try {
        const { username, password } = req.body;
        const vendor = await Vendor.findOne({ username });
        const verificationStatus = vendor.verificationStatus;
        let bool = false;
        if (verificationStatus == 'not verified' && ((!vendor.vendorImage || vendor.vendorImage.trim() === ""))) {

            bool = true;
            console.log('Vendor image URL is null, empty, or contains only whitespace');
        }
        else if (verificationStatus == 'not verified' && ((!vendor.shopImage || vendor.shopImage.trim() === ""))) {
            bool = true;
            console.log('shop image URL is null, empty, or contains only whitespace');
        }

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        if (password !== vendor.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }


        console.log('Generated secret key:', secretKey);

        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: '1h' });
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.vendorId) {
            const vendorId = decodedToken.vendorId;
            // const type=vendor.role;
            res.status(200).json({ message: `Login successful.`, vendorId, token, bool });
        } else {
            res.status(500).json({ message: 'Failed to extract vendorId from token.' });
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all vendors
const getAllVendors = async (req, res) => {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific vendor by ID
const getVendorById = async (req, res) => {
    try {
        const vendor = await Vendor.findById(req.params.id);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a vendor by ID
const updateVendor = async (req, res) => {
    try {
        const updatedVendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json(updatedVendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a vendor by ID
const deleteVendor = async (req, res) => {
    try {
        const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);
        if (!deletedVendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }
        res.status(200).json({ message: 'Vendor deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//check
const checkUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const existingVendor = await Vendor.findOne({ username });
        res.json({ isUnique: !existingVendor });
    } catch (error) {
        // console.error(error);
        // res.status(500).json({ message: 'Internal server error' });
    }
};

const checkEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const existingVendor = await Vendor.findOne({ email });
        res.json({ isUnique: !existingVendor });
    } catch (error) {
        // console.error(error);
        // res.status(500).json({ message: 'Internal server error' });
    }
};

const checkContact = async (req, res) => {
    try {
        const contactNumber = req.params.contactNumber;
        const existingVendor = await Vendor.findOne({ contactNumber });
        res.json({ isUnique: !existingVendor });
    } catch (error) {
        // console.error(error);
        // res.status(500).json({ message: 'Internal server error' });
    }
};



const postImages = async (req, res) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;
        const { vendorImage, shopImage } = req.body;
        const vendorid = req.params.id;//d to get the vendorid from the URL

        // Find the vendor document by its ID
        const vendor = await Vendor.findById(vendorid);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Update the vendor document with the image URLs
        vendor.vendorImage = vendorImage;
        vendor.shopImage = shopImage;

        // Save the updated document
        await vendor.save();

        // Send the updated document as the response
        res.status(200).json(vendor);
    } catch (error) {
        console.error('Error updating document:', req.params.id, error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = {
    createVendor,
    loginVendor,
    getAllVendors,
    getVendorById,
    updateVendor,
    deleteVendor,
    checkContact,
    checkEmail,
    checkUsername,
    postImages
};
