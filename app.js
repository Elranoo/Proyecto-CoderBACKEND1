require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { engine } = require('express-handlebars');
require('dotenv').config();

const productsRouter = require('./routes/products.route');
const cartsRouter = require('./routes/carts.route');
const viewsRouter = require('./routes/views.route');

const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB conectado a Atlas'))
  .catch(err => console.log('Error de conexión:', err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));