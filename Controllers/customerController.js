const Customer = require('../models/customers.model');
const jwt = require('jsonwebtoken');
const secretKey = require('./GenerateSecretKey')
// Use the secretKey variable in your code
console.log('Secret key customer:', secretKey);

exports.signup = async (req, res) => {
    try {
        const { name, username, password, location, preferences, email } = req.body;
        const customer = new Customer({ name, username, password, location, preferences, email });
        const existingUser = await Customer.findOne({ username: req.body.username });
        const existingEmail = await Customer.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(409).send('Email already registered');
        }
        if (existingUser) {
            return res.status(409).send('Username already taken');
        }

        await customer.save();
        res.status(201).json({ message: 'Signup successful' });

    } catch (error) {

        res.status(400).json({ message: error.message });
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

exports.updateCustomer= async (req, res) => {
    try {
        const { name, username, password, location, preferences, email } = req.body;
        const customer = await Customer.findByIdAndUpdate(req.params.id, { name, username, password, location, preferences, email });
        if (!customer) {
            throw new Error('Customer not found');
        }
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            throw new Error('Customer not found');
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Other controller methods (login, logout, password reset) would be implemented similarly
//const bcrypt = require('bcrypt');

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const customer = await Customer.findOne({ username });
        if (!customer) {
            throw new Error('Invalid username or password');
        }
        if (password !== customer.password) {
            throw new Error('Invalid username or password');
        }

        // Generate a JWT token
        const token = jwt.sign({ customerId: customer._id }, 'secretKey', { expiresIn: '1h' });
        const decodedToken = jwt.decode(token);
        if (decodedToken && decodedToken.customerId) {
            const customerId = decodedToken.customerId;
        res.status(200).json({ message: 'Login successful', token,customerId });
    }}catch (error) {
        res.status(401).json({ message: error.message });
    }
};