import express from "express";
import { ProductManager } from "./../productManager.js"

const products = new ProductManager('./products.json')

export const realTimeProducts = express.Router();

realTimeProducts.get("/", async (req, res) => {
    try {
        const get_products = await products.getProducts(); 
        return res.render("realTimeProducts", {products: get_products}); //Recibe los datos del productManager de getProduct y los renderiza en la plantilla realTimeroducts
        //Lo que hace guardar get_products en una variable "products" es poder utilizarla en el handlebars para iterarla

    } catch (error) {
        res.status(500).json({ error: error.message })        
    }
    
});

