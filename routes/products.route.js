const express = require('express');
const GestorProductos = require('../managers/ProductManager');
const { io } = require('../app');

const router = express.Router();
const gp = new GestorProductos();

router.get('/', async (req, res) => {
    const productos = await gp.obtenerTodos();
    res.json(productos);
});

router.get('/:pid', async (req, res) => {
    const producto = await gp.obtenerPorId(req.params.pid);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
});

router.post('/', async (req, res) => {
    const body = req.body;
    if (!body.title || !body.price) return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    const nuevo = await gp.agregarProducto(body);
    io.emit('updateProducts', await gp.obtenerTodos());
    res.status(201).json(nuevo);
});

router.put('/:pid', async (req, res) => {
    const actualizado = await gp.actualizarProducto(req.params.pid, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    io.emit('updateProducts', await gp.obtenerTodos());
    res.json(actualizado);
});

router.delete('/:pid', async (req, res) => {
    const eliminado = await gp.eliminarProducto(req.params.pid);
    if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });

    const productosActualizados = await gp.obtenerTodos();
    io.emit('updateProducts', productosActualizados);

    res.json({ mensaje: 'Producto eliminado' });
});

module.exports = router;



