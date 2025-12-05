const express = require('express');
const ProductModel = require('../models/Product');
const CartModel = require('../models/Cart');
const router = express.Router();

router.get('/products', async (req, res) => {
  const { page = 1 } = req.query;
  const result = await ProductModel.paginate({}, { page, limit: 5, lean: true });
  res.render('home', {
    productos: result.docs,
    hasNext: result.hasNextPage,
    hasPrev: result.hasPrevPage,
    nextPage: result.nextPage,
    prevPage: result.prevPage
  });
});

router.get('/products/:pid', async (req, res) => {
  const producto = await ProductModel.findById(req.params.pid).lean();
  res.render('productDetail', { producto });
});

router.get('/carts/:cid', async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).populate('products.product').lean();
  res.render('cart', { productos: cart.products });
});

module.exports = router;




