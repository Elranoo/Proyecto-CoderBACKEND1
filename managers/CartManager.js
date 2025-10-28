const fs = require('fs').promises;
const path = require('path');

class GestorCarritos {
    constructor(archivo = 'data/carts.json') {
        this.path = path.resolve(archivo);
    }

    async _leerArchivo() {
        try {
            const contenido = await fs.readFile(this.path, 'utf8');
            return JSON.parse(contenido || '[]');
        } catch (err) {
            if (err.code === 'ENOENT') {
                await this._escribirArchivo([]);
                return [];
            }
            throw err;
        }
    }

    async _escribirArchivo(datos) {
        await fs.mkdir(path.dirname(this.path), { recursive: true });
        await fs.writeFile(this.path, JSON.stringify(datos, null, 2), 'utf8');
    }

    async _generarId(items) {
        const max = items.reduce((acc, it) => {
            const num = Number(it.id);
            return Number.isFinite(num) ? Math.max(acc, num) : acc;
        }, 0);
        return max + 1;
    }

    async crearCarrito() {
        const items = await this._leerArchivo();
        const id = await this._generarId(items);
        const carrito = { id, products: [] };
        items.push(carrito);
        await this._escribirArchivo(items);
        return carrito;
    }

    async obtenerCarrito(id) {
        const items = await this._leerArchivo();
        return items.find(c => String(c.id) === String(id)) || null;
    }

    async agregarProducto(carritoId, productoId) {
        const items = await this._leerArchivo();
        const idx = items.findIndex(c => String(c.id) === String(carritoId));
        if (idx === -1) return null;

        const carrito = items[idx];
        const prodIdx = carrito.products.findIndex(p => String(p.product) === String(productoId));

        if (prodIdx === -1) {
            carrito.products.push({ product: productoId, quantity: 1 });
        } else {
            carrito.products[prodIdx].quantity = Number(carrito.products[prodIdx].quantity) + 1;
        }

        items[idx] = carrito;
        await this._escribirArchivo(items);
        return carrito;
    }
}

module.exports = GestorCarritos;

