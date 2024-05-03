const Product = require('../models/products.model');
const Vendor = require('../models/vendors.model');
const mongoose = require('mongoose')
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ vendorId: req.params.vendorId });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addProduct = async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl, // Include imageUrl field
        vendorId: req.body.vendorId
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.imageUrl = req.body.imageUrl; // Include imageUrl field

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};




exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.deleteOne({ _id: productId });
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




exports.getRandomProducts = async (req, res) => {
    try {
        // Find all vendors with businessType 'thinkit'
        const thinkitVendors = await Vendor.find({ businessType: 'thinkit' }).select('_id');
        const vendorIds = thinkitVendors.map(vendor => vendor._id);
        
        // Get a random product from those vendors
        const randomProduct = await Product.aggregate([
            { $match: { vendorId: { $in: vendorIds } } }, // Corrected field name to vendorId
            { $sample: { size: 5} }
        ]);

        if (randomProduct.length) {
            res.json(randomProduct);
        } else {
            res.status(404).send('No products found for thinkit vendors');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};


exports.searchThinkitProducts= async (req, res) => {
    const { q } = req.query;

    try {
        // Find vendors with businessType 'thinkit'
        const thinkitVendors = await Vendor.find({ businessType: 'thinkit' }).select('_id');
        const vendorIds = thinkitVendors.map(vendor => vendor._id);

        // Find products from vendors with businessType 'thinkit' that match the search query
        const products = await Product.find({
            $and: [
                { vendorId: { $in: vendorIds } },
                { $text: { $search: q } }
            ]
        });

        res.json(products);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Server error');
    }
};