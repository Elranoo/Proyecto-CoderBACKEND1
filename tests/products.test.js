const request = require('supertest');
const app = require('../src/app'); // Asegúrate de que la ruta sea correcta

describe('Products API', () => {
    it('should get all products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('products');
    });

    it('should get a product by id', async () => {
        const res = await request(app).get('/api/products/1'); // Cambia el ID según tus datos
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    });

    it('should add a new product', async () => {
        const newProduct = {
            name: 'Test Product',
            price: 100,
            description: 'This is a test product',
        };
        const res = await request(app).post('/api/products').send(newProduct);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('product');
    });

    it('should update an existing product', async () => {
        const updatedProduct = {
            name: 'Updated Product',
            price: 150,
            description: 'This is an updated test product',
        };
        const res = await request(app).put('/api/products/1').send(updatedProduct); // Cambia el ID según tus datos
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('product');
    });

    it('should delete a product', async () => {
        const res = await request(app).delete('/api/products/1'); // Cambia el ID según tus datos
        expect(res.statusCode).toEqual(204);
    });
});