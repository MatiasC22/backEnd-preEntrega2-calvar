import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carts.json');

export default class CartManager {
  constructor() {
    this.carts = [];
    this.init();
  }

  async init() {
    try {
      const data = await fs.readFile(cartsFilePath, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
    }
  }

  // Guardar en archivo
  async saveToFile() {
    const jsonData = JSON.stringify(this.carts, null, 2);
    await fs.writeFile(cartsFilePath, jsonData);
  }

  // Crear un nuevo carrito
  async createCart() {
    const newCart = {
      id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
      products: [],
    };
    this.carts.push(newCart);
    await this.saveToFile();
    return newCart;
  }

  // Obtener un carrito por ID
  async getCartById(id) {
    return this.carts.find((cart) => cart.id === id);
  }

  // Agregar un producto a un carrito
  async addProductToCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    if (!cart) return null;

    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      // Incrementar cantidad si el producto ya existe
      existingProduct.quantity += 1;
    } else {
      // Agregar un nuevo producto al carrito
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.saveToFile();
    return cart;
  }
}
