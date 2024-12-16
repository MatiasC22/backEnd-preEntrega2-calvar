import fs from 'fs/promises';
import path from 'path';

const productosFilePath = path.resolve('data','productos.json');


export default class ProductMananger{   
    
    //Constructor

    constructor(){
        this.products = [];
        this.init()
    }

    async init(){
        try {
            const data = await fs.readFile(productosFilePath, 'utf-8');
            this.products = JSON.parse(data);
        } catch (error) {
            this.products =[];
        }
    }

    //  **  Metodos  ****//

    // Save to File
    async saveToFile(){
        const jsonData = JSON.stringify(this.products,null,2);
        await fs.writeFile(productosFilePath, jsonData);
    }

     //------getAllProducts---------//
    async getAllProducts(limit){
        if(limit){
            return this.products.slice(0,limit);
        }
        return this.products;
    }
    

     //------getProductsById---------//

     async getProductById(id){
        return this.products.find(product => product.id === id);
    }
     //------addProduct---------//

    async addProduct(produc){
        const newProduct = {
            id: this.products.length ? this.products[this.products.length - 1].id + 1 : 1,
            ...produc,
            status: true,
        }

        this.products.push(newProduct);
        //hacer guardado en el Archivo
        this.saveToFile()

        return newProduct
    }
     //------upDateProduc---------//

     async upDateProduct(id, upDatedFields){
        const productIndex = this.products.findIndex(produc => produc.id === id);
        if(productIndex === -1) return null;

        const upDatedProduc = {
            ...this.products[productIndex],
            ...upDatedFields,
            id: this.products[productIndex].id, //Aseguramos que el id no actualice
        };

        this.products[productIndex] = upDatedProduc;
        this.saveToFile();
        return upDatedProduc;
    }

     //------deleteProduct---------//

     deleteProduct(id){
        const productIndex = this.products.findIndex(produc => produc.id === id);
        if(productIndex === -1) return null;

        const deletedProduct = this.products.splice(productIndex, 1);
        this.saveToFile();
        return deletedProduct[0];
     }
}