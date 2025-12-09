const express = require('express');
const ProductModel = require('../models/Product');
const CartModel = require('../models/Cart');
const router = express.Router();


router.get('/', async (req, res) => {
  const { page = 1 } = req.query;

  try {
    const result = await ProductModel.paginate({}, { page, limit: 5, lean: true });


    let cart = await CartModel.findOne().lean();
    if (!cart) {
      const newCart = await CartModel.create({ products: [] });
      cart = newCart.toObject();
    }

    res.render('home', {
      productos: result.docs,
      hasNext: result.hasNextPage,
      hasPrev: result.hasPrevPage,
      nextPage: result.nextPage,
      prevPage: result.prevPage,
      cartId: cart._id 
    });

  } catch (err) {
    res.status(500).send('Error al cargar productos');
  }
});


router.get('/products/:pid', async (req, res) => {
  try {
    const producto = await ProductModel.findById(req.params.pid).lean();
    if (!producto) return res.status(404).send('Producto no encontrado');


    let cart = await CartModel.findOne().lean();
    if (!cart) {
      const newCart = await CartModel.create({ products: [] });
      cart = newCart.toObject();
    }

    res.render('productDetail', { producto, cartId: cart._id });
  } catch (err) {
    res.status(500).send('Error al cargar el producto');
  }
});


router.get('/carts/:cid', async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).populate('products.product').lean();
  if (!cart) return res.status(404).send('Carrito no encontrado');
  res.render('cart', { productos: cart.products, _id: cart._id });
});

module.exports = router;






