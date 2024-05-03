const express = require('express');
const router = express.Router();
const productController = require('../Controllers/productController');

router.get('/:vendorId', productController.getAllProducts);
router.post('/', productController.addProduct);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);
router.get('/random/thinkit', productController.getRandomProducts);
router.get('/search/thinkitProducts/')
module.exports = router;









