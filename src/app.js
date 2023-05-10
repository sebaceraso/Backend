const express = require('express');
const ProductManager = require('./productManager.js');
const productManager = new ProductManager("./src/products.json");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/products', async (req, res) => {
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


app.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
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

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
})
