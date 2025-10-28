const CartsService = require('../services/cartsService');

class CartsController {
    constructor() {
        this.cartsService = new CartsService();
    }

    async createCart(req, res) {
        try {
            const newCart = await this.cartsService.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            res.status(500).json({ message: 'Error creating cart', error });
        }
    }

    async getCartProducts(req, res) {
        try {
            const cartId = req.params.id;
            const products = await this.cartsService.getCartProducts(cartId);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving cart products', error });
        }
    }

    async addProductToCart(req, res) {
        try {
            const cartId = req.params.id;
            const productId = req.body.productId;
            const updatedCart = await this.cartsService.addProductToCart(cartId, productId);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ message: 'Error adding product to cart', error });
        }
    }
}

module.exports = new CartsController();