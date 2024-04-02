// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../Controllers/customerController');

router.post('/signup', customerController.signup);
router.get('/:id', customerController.getCustomerById);
router.put('/update/:id', customerController.updateCustomer);
router.delete('/delete/:id', customerController.deleteCustomer);
router.get('/', customerController.getAllCustomers);
router.post('/login', customerController.login);

module.exports = router;
