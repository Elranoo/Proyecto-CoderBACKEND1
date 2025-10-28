const express = require('express');
const ProductManager = require('../managers/ProductManager');

const router = express.Router();
const pm = new ProductManager();

router.get('/', async (req, res) => {
    const all = await pm.getAll();
    res.json(all);
});

router.get('/:pid', async (req, res) => {
    const prod = await pm.getById(req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(prod);
});

router.post('/', async (req, res) => {
    const body = req.body;

    if (!body.title || !body.price) {
    return res.status(400).json({ error: 'Faltan campos requeridos: title y price' });
}
    const newProd = await pm.addProduct(body);
    res.status(201).json(newProd);
});

router.put('/:pid', async (req, res) => {
    const updated = await pm.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
});

router.delete('/:pid', async (req, res) => {
    const ok = await pm.deleteProduct(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
});

module.exports = router;
