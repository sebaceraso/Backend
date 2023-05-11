import express from 'express';
import { ProductManager } from '../productManager.js';

const productManager = new ProductManager("products.json");
export const productsRouter = express.Router();


productsRouter.get('/', async (req, res) => {
    try {
      const limit = req.query.limit;
      const products = await productManager.getProducts();
      if (limit) {
        return res.json(products.slice(0, limit));
      } else {
        return res.json(products);
      }
    } catch (error) {
      return res.json({ message: "Error" })
    }
});
  
  
productsRouter.get('/:pid', async (req, res) => {
    try {
      const id = req.params.pid;
      const product = await productManager.getProductsById(parseInt(id));
      if (!product) {
        return res.json({ message: "Producto no encontrado" })
      } else {
        return res.json(product);
      }
    } catch (error) {
      return res.json({ message: "Error" })
    }
  });


  productsRouter.post("/", async (req, res) =>{
    try{
      const producto = req.body //el front me va a dar el nuevo producto
      const products = await productManager.getProducts();
      const code = products.find((codi) => codi.code === producto.code);
      if(producto.id){
        return res.status(400).json({
          status: "error",
          msg: "No se puede agregar el id pepepe"
        })
      }   
      
      if(code){
        return res.status(400).json({
          status: "error",
          msg: "Ese codigo ya exite pipi"
        })
      } 
      if(
        !producto.title ||
        !producto.description ||
        !producto.price ||
        !producto.code ||
        !producto.stock){
          return res.status(401).json({
            status: "error",
            msg: "Producto no generado porque falta completar un campo",
            
          })
          
        } 
        const crearProducto = await productManager.addProduct({...producto, status: true});
        return res.status(201).json({
          status: "success",
          msg: "Producto guardado",
          data: crearProducto,
        })

      } catch (error) {
        return res.json({ message: "Error" })
      }
  } )