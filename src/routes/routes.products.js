import express from "express";
import { ProductManager } from "../productManager.js";
import { uploader } from "../utils.js";


const productManager = new ProductManager("products.json");
export const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const limit = req.query.limit;//Escribir en el postman: http://localhost:8080/api/products/?limit=2 para que me muestre solo 2 productos
    const products = await productManager.getProducts();
    if (limit) {
      return res.json(products.slice(0, limit));
    } else {
      return res.json(products);
    }
  } catch (error) {
    return res.json({ message: "Error" });
  }
});

productsRouter.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const product = await productManager.getProductsById(parseInt(id));
    if (!product) {
      return res.json({ message: "Producto no encontrado" });
    } else {
      return res.json(product);
    }
  } catch (error) {
    return res.json({ message: "Error" });
  }
});

productsRouter.post("/", uploader.single("file"), async (req, res) => {  
  try {
    const producto = req.body; //el front me va a dar el nuevo producto
    producto.picture = req.file.filename;
    const products = await productManager.getProducts();
    const code = products.find((codi) => codi.code === producto.code);
    if (producto.id) {
      return res.status(400).json({
        status: "error",
        msg: "No se puede agregar el id pepepe",
      });
    }

    if (code) {
      return res.status(400).json({
        status: "error",
        msg: "Ese codigo ya existe pipi",
      });
    }
    if (
      !producto.title ||
      !producto.description ||
      !producto.price ||
      !producto.code ||
      !producto.stock
    ) {
      return res.status(401).json({
        status: "error",
        msg: "Producto no generado porque falta completar un campo",
      });
    }
    
    const crearProducto = await productManager.addProduct({
      ...producto,
      status: true,
    });
    return res.status(201).json({
      status: "success",
      msg: "Producto guardado",
      data: crearProducto,
    });
  } catch (error) {
    return res.json({ message: "Error" });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    //recibir de postman lo datos que voy a modificar
    const id = req.params.pid;
    const update = req.body; //voy a recibir lo que escribo en el postman
    const productos = await productManager.getProductsById(parseInt(id)); //PQ ES NECESARIO PASARLO A ENTERO?Pq el id viene de un formato json y es un string
    if (productos.id) {
      //Si existe como propiedad el id en el postman, no se deberia modificar el id del producto
      return res.status(400).json({
        status: "error",
        msg: "No se puede modificar el id",
      });
    }
    if (productos) {
      await productManager.updateProduct(productos.id, update);
      return res.status(201).json({
        status: "success",
        msg: "Producto modificado",
        data: productos,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      msg: "Producto no encontrado",
    });
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const producto = await productManager.deleteProduct(parseInt(id));
    if (!producto) {
      return res.status(404).json({
        status: "error",
        msg: "Producto no encontrado",
      });
    }
    return res.status(201).json({
      status: "success",
      msg: "Producto eliminado",
      data: producto,
    });
  } catch (error) {
    //Si el producto no existe
    return res.status(404).json({
      status: "error",
      msg: "Algo salio mal",
    });
  }
});
