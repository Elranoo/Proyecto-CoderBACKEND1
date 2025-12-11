require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { engine } = require('express-handlebars');

const productsRouter = require('./routes/products.route');
const cartsRouter = require('./routes/carts.route');
const viewsRouter = require('./routes/views.route');

const app = express();


app.engine('handlebars', engine({
    defaultLayout: false,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);


console.log("MONGO_URL ->", process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB conectado a Atlas'))
  .catch(err => console.log('Error de conexión a MongoDB:', err));


const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));