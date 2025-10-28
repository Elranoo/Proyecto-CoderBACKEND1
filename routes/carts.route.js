const express = require('express');
const GestorCarritos = require('../managers/CartManager');

const router = express.Router();
const gc = new GestorCarritos();

router.post('/', async (req, res) => {
    const carrito = await gc.crearCarrito();
    res.status(201).json(carrito);
});

router.get('/:cid', async (req, res) => {
    const carrito = await gc.obtenerCarrito(req.params.cid);
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    res.json(carrito.products);
});

router.post('/:cid/product/:pid', async (req, res) => {
    const carrito = await gc.agregarProducto(req.params.cid, req.params.pid);
    if (!carrito) return res.status(404).json({ mensaje: 'Carrito no encontrado' });
    res.json(carrito);
});

module.exports = router;

