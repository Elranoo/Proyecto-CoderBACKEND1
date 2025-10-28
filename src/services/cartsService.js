class CartsService {
    constructor(db) {
        this.db = db;
    }

    async createCart() {
        const newCart = { id: this.db.generateId(), products: [] };
        await this.db.saveCart(newCart);
        return newCart;
    }

    async getCartProducts(cartId) {
        const cart = await this.db.getCartById(cartId);
        return cart ? cart.products : null;
    }

    async addProductToCart(cartId, productId) {
        const cart = await this.db.getCartById(cartId);
        if (!cart) {
            throw new Error('Cart not found');
        }
        cart.products.push(productId);
        await this.db.updateCart(cartId, cart);
        return cart;
    }
}

export default CartsService;