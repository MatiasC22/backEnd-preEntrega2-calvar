import { Router } from 'express';
import ProductManager from '../services/products.mananger.js';

const router = Router();
const productManager = new ProductManager();

// Ruta Home: Lista de productos
router.get('/home', async (req, res) => {
    const products = await productManager.getAllProducts();
    res.render('home', { products });
});

// Ruta RealTimeProducts: Lista en tiempo real
router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getAllProducts();
    res.render('realTimeProducts', { products });
});

export default router;
