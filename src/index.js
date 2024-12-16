import express from "express";
import __dirname from "./utils.js";
import handlebars from 'express-handlebars';
import viewsRoutes from './routes/views.routes.js';
import ProductManager from './services/products.mananger.js';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 9090;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Directorio público
app.use(express.static(__dirname + '/public'));

app.get('/ping', (req, res) => {
    res.render("index")
})



// Rutas
app.use("/", viewsRoutes);

// Inicializamos el servidor HTTP
const httpServer = app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});

// Inicializamos Socket.io
const socketServer = new Server(httpServer);

// Instanciamos ProductManager
const productManager = new ProductManager();

// Configuramos eventos de WebSocket
socketServer.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado');

    // Emitir lista inicial de productos
    socket.emit('updateProducts', await productManager.getAllProducts());

    // Escuchar eventos para agregar productos
    socket.on('addProduct', async (productData) => {
        try {
            await productManager.addProduct(productData);
            const updatedProducts = await productManager.getAllProducts();
            socketServer.emit('updateProducts', updatedProducts);
        } catch (error) {
            console.error("Error al agregar producto:", error);
            socket.emit('error', { message: 'No se pudo agregar el producto.' });
        }
    });

    // Escuchar eventos para eliminar productos
    // Eliminar un producto específico
    socket.on('deleteProduct', async (productId) => {
        try {
            const deletedProduct = await productManager.deleteProduct(productId);
            if (deletedProduct) {
                const updatedProducts = await productManager.getAllProducts();
                socketServer.emit('updateProducts', updatedProducts);
            } else {
                socket.emit('error', { message: 'Producto no encontrado.' });
            }
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            socket.emit('error', { message: 'No se pudo eliminar el producto.' });
        }
    });

    // Eliminar todos los productos
    socket.on('deleteAllProducts', async () => {
        try {
            await productManager.deleteAllProducts();
            socketServer.emit('updateProducts', []);
        } catch (error) {
            console.error("Error al eliminar todos los productos:", error);
            socket.emit('error', { message: 'No se pudo eliminar los productos.' });
        }
    });
});
