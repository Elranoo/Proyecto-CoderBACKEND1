class ProductsService {
    constructor(db) {
        this.db = db;
    }

    async getAllProducts() {
        return await this.db.read('products.json');
    }

    async getProductById(id) {
        const products = await this.getAllProducts();
        return products.find(product => product.id === id);
    }

    async addProduct(product) {
        const products = await this.getAllProducts();
        products.push(product);
        await this.db.write('products.json', products);
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const products = await this.getAllProducts();
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            await this.db.write('products.json', products);
            return products[index];
        }
        return null;
    }

    async deleteProduct(id) {
        const products = await this.getAllProducts();
        const filteredProducts = products.filter(product => product.id !== id);
        await this.db.write('products.json', filteredProducts);
        return products.length !== filteredProducts.length;
    }
}

export default ProductsService;