const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');

router.get('/:vendorId', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
