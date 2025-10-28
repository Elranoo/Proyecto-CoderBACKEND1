const fs = require('fs').promises;
const path = require('path');

class GestorProductos {
    constructor(archivo = 'data/products.json') {
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

    async obtenerTodos() {
        return await this._leerArchivo();
    }

    async obtenerPorId(id) {
        const items = await this._leerArchivo();
        return items.find(p => String(p.id) === String(id)) || null;
    }

    async _generarId(items) {
        const max = items.reduce((acc, it) => {
            const num = Number(it.id);
            return Number.isFinite(num) ? Math.max(acc, num) : acc;
        }, 0);
        return max + 1;
    }

    async agregarProducto(data) {
        const items = await this._leerArchivo();
        const id = await this._generarId(items);
        const nuevoProducto = {
            id,
            title: data.title || '',
            description: data.description || '',
            code: data.code || '',
            price: Number(data.price) || 0,
            status: data.status === undefined ? true : Boolean(data.status),
            stock: Number(data.stock) || 0,
            category: data.category || '',
            thumbnails: Array.isArray(data.thumbnails) ? data.thumbnails : []
        };
        items.push(nuevoProducto);
        await this._escribirArchivo(items);
        return nuevoProducto;
    }

    async actualizarProducto(id, campos) {
        const items = await this._leerArchivo();
        const idx = items.findIndex(p => String(p.id) === String(id));
        if (idx === -1) return null;

        const permitidos = ['title','description','code','price','status','stock','category','thumbnails'];
        for (const key of permitidos) {
            if (campos[key] !== undefined) {
                items[idx][key] = key === 'price' || key === 'stock' ? Number(campos[key]) : campos[key];
            }
        }
        await this._escribirArchivo(items);
        return items[idx];
    }

    async eliminarProducto(id) {
        const items = await this._leerArchivo();
        const idx = items.findIndex(p => String(p.id) === String(id));
        if (idx === -1) return false;
        items.splice(idx, 1);
        await this._escribirArchivo(items);
        return true;
    }
}

module.exports = GestorProductos;

