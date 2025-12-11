const express = require('express');
const CartModel = require('../models/Cart');
const router = express.Router();

router.post('/', async (req, res) => {
  const carrito = await CartModel.create({ products: [] });
  res.status(201).json(carrito);
});

router.get('/:cid', async (req, res) => {
  const carrito = await CartModel.findById(req.params.cid).populate('products.product').lean();
  if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
  res.json(carrito.products);
});

router.post('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await CartModel.findById(cid);
  if (!cart) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

  const index = cart.products.findIndex(p => p.product.toString() === pid);
  if (index === -1) cart.products.push({ product: pid, quantity: 1 });
  else cart.products[index].quantity++;

  await cart.save();
  res.json(cart);
});

router.put('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  const cart = await CartModel.findById(cid);
  if (!cart) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

  const prod = cart.products.find(p => p.product.toString() === pid);
  if (!prod) return res.status(404).json({ mensaje: 'Producto no encontrado en el carrito' });

  prod.quantity = quantity;
  await cart.save();
  res.json(cart);
});

router.put('/:cid', async (req, res) => {
  const { products } = req.body;
  await CartModel.findByIdAndUpdate(req.params.cid, { products });
  res.json({ status: 'success' });
});

router.delete('/:cid/products/:pid', async (req, res) => {
  const cart = await CartModel.findById(req.params.cid);
  if (!cart) return res.status(404).json({ mensaje: 'Carrito no encontrado' });

  cart.products = cart.products.filter(p => p.product.toString() !== req.params.pid);
  await cart.save();
  res.json(cart);
});

router.delete('/:cid', async (req, res) => {
  await CartModel.findByIdAndUpdate(req.params.cid, { products: [] });
  res.json({ status: 'success' });
});

module.exports = router;