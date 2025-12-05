const express = require('express');
const ProductModel = require('../models/Product');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
      filter.$or = [
        { category: query },
        { status: query === 'true' }
      ];
    }

    const options = { limit: parseInt(limit), page: parseInt(page), lean: true };
    if (sort) options.sort = { price: sort === 'asc' ? 1 : -1 };

    const result = await ProductModel.paginate(filter, options);

    res.json({
      status: 'success',
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
    });

  } catch (error) {
    res.json({ status: 'error', error: error.message });
  }
});

router.get('/:pid', async (req, res) => {
  const producto = await ProductModel.findById(req.params.pid).lean();
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(producto);
});

router.post('/', async (req, res) => {
  const nuevo = await ProductModel.create(req.body);
  res.status(201).json(nuevo);
});

router.put('/:pid', async (req, res) => {
  const actualizado = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(actualizado);
});

router.delete('/:pid', async (req, res) => {
  const eliminado = await ProductModel.findByIdAndDelete(req.params.pid);
  if (!eliminado) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json({ mensaje: 'Producto eliminado' });
});

module.exports = router;





