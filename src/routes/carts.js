const express = require('express');
const router = express.Router();
const CartsController = require('../controllers/cartsController');

router.post('/', CartsController.createCart);
router.get('/:cartId/products', CartsController.getCartProducts);
router.post('/:cartId/products', CartsController.addProductToCart);

module.exports = router;