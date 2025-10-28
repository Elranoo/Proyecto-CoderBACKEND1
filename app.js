const express = require('express');

const productsRouter = require('./routes/products.route');
const cartsRouter = require('./routes/carts.route');

const app = express();
app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT);
});