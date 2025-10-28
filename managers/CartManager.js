const fs = require('fs').promises;
const path = require('path');

class CartManager {
    constructor(filename = 'data/carts.json') {
    this.path = path.resolve(filename);
}

async _readFile() {
    try {
        const content = await fs.readFile(this.path, 'utf8');
        return JSON.parse(content || '[]');
    } catch (err) {
    if (err.code === 'ENOENT') {
        await this._writeFile([]);
        return [];
    }
    throw err;
    }
}

async _writeFile(data) {
    await fs.mkdir(path.dirname(this.path), { recursive: true });
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf8');
}

async _generateId(items) {
    const max = items.reduce((acc, it) => {
        const num = Number(it.id);
        return Number.isFinite(num) ? Math.max(acc, num) : acc;
    }, 0);
    return max + 1;
}

async createCart() {
    const items = await this._readFile();
    const id = await this._generateId(items);
    const cart = { id, products: [] };
    items.push(cart);
    await this._writeFile(items);
    return cart;
}

async getCartById(id) {
    const items = await this._readFile();
    return items.find(c => String(c.id) === String(id)) || null;
}

async addProductToCart(cid, pid) {
    const items = await this._readFile();
    const idx = items.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) return null;
    const cart = items[idx];

    const prodIdx = cart.products.findIndex(p => String(p.product) === String(pid));
    if (prodIdx === -1) {
        cart.products.push({ product: pid, quantity: 1 });
    } else {
        cart.products[prodIdx].quantity = Number(cart.products[prodIdx].quantity) + 1;
    }

    items[idx] = cart;
    await this._writeFile(items);
    return cart;
}
}

module.exports = CartManager;
