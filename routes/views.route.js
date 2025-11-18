const express = require('express');
const GestorProductos = require('../managers/ProductManager');

const router = express.Router();
const gp = new GestorProductos();

router.get('/home', async (req, res) => {
    const productos = await gp.obtenerTodos();
    res.render('home', { productos });
});

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

module.exports = router;


