const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const cartsRoutes = require('./routes/carts');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use(errorHandler);

module.exports = app;