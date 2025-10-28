const ProductsService = require('../services/productsService');

class ProductsController {
    constructor() {
        this.productsService = new ProductsService();
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productsService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products' });
        }
    }

    async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await this.productsService.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product' });
        }
    }

    async addProduct(req, res) {
        const newProduct = req.body;
        try {
            const createdProduct = await this.productsService.addProduct(newProduct);
            res.status(201).json(createdProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error adding product' });
        }
    }

    async updateProduct(req, res) {
        const { id } = req.params;
        const updatedProduct = req.body;
        try {
            const product = await this.productsService.updateProduct(id, updatedProduct);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        }
    }

    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const deleted = await this.productsService.deleteProduct(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        }
    }
}

module.exports = new ProductsController();