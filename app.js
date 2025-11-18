const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { engine } = require('express-handlebars');
const GestorProductos = require('./managers/ProductManager');

const productsRouter = require('./routes/products.route');
const cartsRouter = require('./routes/carts.route');
const viewsRouter = require('./routes/views.route');

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

const gp = new GestorProductos();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

io.on('connection', async (socket) => {
    console.log('Cliente conectado');

    const productos = await gp.obtenerTodos();
    socket.emit('updateProducts', productos);

    socket.on('newProduct', async (data) => {
        await gp.agregarProducto(data);
        const productosActualizados = await gp.obtenerTodos();
        io.emit('updateProducts', productosActualizados);
    });

    socket.on('deleteProduct', async (id) => {
        await gp.eliminarProducto(id);
        const productosActualizados = await gp.obtenerTodos();
        io.emit('updateProducts', productosActualizados);
    });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto', PORT);
});

module.exports = { io };





