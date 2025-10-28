function validateProduct(product) {
    const { name, price, description } = product;
    if (!name || typeof name !== 'string' || name.trim() === '') {
        return { valid: false, message: 'El nombre del producto es requerido y debe ser una cadena no vacía.' };
    }
    if (typeof price !== 'number' || price <= 0) {
        return { valid: false, message: 'El precio del producto debe ser un número positivo.' };
    }
    if (!description || typeof description !== 'string') {
        return { valid: false, message: 'La descripción del producto es requerida y debe ser una cadena.' };
    }
    return { valid: true };
}

function validateCart(cart) {
    if (!Array.isArray(cart) || cart.length === 0) {
        return { valid: false, message: 'El carrito debe ser un arreglo y no puede estar vacío.' };
    }
    return { valid: true };
}

module.exports = {
    validateProduct,
    validateCart
};