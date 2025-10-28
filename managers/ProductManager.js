const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filename = 'data/products.json') {
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

async getAll() {
    return await this._readFile();
}

async getById(id) {
    const items = await this._readFile();
    return items.find(p => String(p.id) === String(id)) || null;
}

async _generateId(items) {
    const max = items.reduce((acc, it) => {
        const num = Number(it.id);
        return Number.isFinite(num) ? Math.max(acc, num) : acc;
    }, 0);
    return max + 1;
}

async addProduct(productData) {
    const items = await this._readFile();
    const newId = await this._generateId(items);
    const newProduct = {
        id: newId,
        title: productData.title || '',
        description: productData.description || '',
        code: productData.code || '',
        price: Number(productData.price) || 0,
        status: productData.status === undefined ? true : Boolean(productData.status),
        stock: Number(productData.stock) || 0,
        category: productData.category || '',
        thumbnails: Array.isArray(productData.thumbnails) ? productData.thumbnails : []
    };
    items.push(newProduct);
    await this._writeFile(items);
    return newProduct;
}

async updateProduct(id, fields) {
    const items = await this._readFile();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    // No se debe actualizar el id
    const allowed = ['title','description','code','price','status','stock','category','thumbnails'];
    for (const key of allowed) {
        if (fields[key] !== undefined) {
        items[idx][key] = key === 'price' || key === 'stock' ? Number(fields[key]) : fields[key];
    }
    }
    await this._writeFile(items);
    return items[idx];
}

async deleteProduct(id) {
    const items = await this._readFile();
    const idx = items.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return false;
    items.splice(idx, 1);
    await this._writeFile(items);
    return true;
}
}

module.exports = ProductManager;
