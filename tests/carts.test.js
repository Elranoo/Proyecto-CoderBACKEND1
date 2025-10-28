const request = require('supertest');
const app = require('../src/app'); // Asegúrate de que la ruta sea correcta

describe('Carts API', () => {
    let cartId;

    it('should create a new cart', async () => {
        const response = await request(app)
            .post('/api/carts')
            .send({});

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        cartId = response.body.id;
    });

    it('should get cart products', async () => {
        const response = await request(app)
            .get(`/api/carts/${cartId}/products`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('products');
    });

    it('should add a product to the cart', async () => {
        const productId = 'some-product-id'; // Reemplaza con un ID de producto válido

        const response = await request(app)
            .post(`/api/carts/${cartId}/products`)
            .send({ productId });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product added to cart');
    });
});