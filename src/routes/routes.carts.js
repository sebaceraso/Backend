import express from "express";
import cartManager from "../cartManager.js";
import { ProductManager } from "../productManager.js";

const productManager1 = new ProductManager();
const cartManager1 = new cartManager();
export const cartsRouter = express.Router();

cartsRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;
    const carrito = await cartManager1.readCart();
    if (limit) {
      return res.json(carrito.slice(0, limit));
    } else {
      return res.json(carrito);
    }
  } catch (error) {
    return res.json(error);
  }
});

cartsRouter.post("/", async (req, res) => {
  try {
    const carritoCreado = await cartManager1.addNewCart();
    return res.status(201).json({ carritoCreado, message: "carrito creado" });
  } catch (error) {
    return res.json(error);
  }
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {//NO ME ESTA FUNCIONANDO EL AWAIT DE UPDATECART
  try {
    const idCarrito = parseInt(req.params.cid);//Paramtros del carrito y producto
    const idProducto = parseInt(req.params.pid);

    const cart = await cartManager1.readCart(); //Llamando al carrito y productos
    const product = await productManager1.getProducts();

    const carritoEncontrado = cart.find((e) => e.id === idCarrito);//Si el carrito existe
    console.log(carritoEncontrado);
    if (!carritoEncontrado) {//Si el carrito no existe
      return res
        .status(404)
        .json({ error: "El carrito no existe, primero crea el carrito" });
    }
  
    const productosEncontrado = product.find((e) => e.id === idProducto);
    console.log(productosEncontrado);
    if (!productosEncontrado) {
      return res.status(404).json({ error: "El producto no existe" });
    }
    
    const checkProduct = carritoEncontrado.products.find(e => e.id == productosEncontrado.id)
    if(checkProduct != 0){
      res.status(200).json({ message: "El producto se incremento", data: carritoEncontrado, dataProducto: productosEncontrado})      
    } else {
      res.status(200).json({ message: "El producto se añadio al carrito", data: productosEncontrado})
    }   
    await cartManager1.updateCart(idCarrito, idProducto);
  } catch (error) {
    return res.json(error);
  }
});
