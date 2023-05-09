const express = require('express')
const ProductManager = require(".productManager.js");
const container = new ProductManager("./products.json");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/productos', async (req, res) => {
  const limit = req.query.limit;
  const products = await container.getProduct();
  if(limit){
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
  
});

app.get('/productos/:id', async (req, res) => {
  const id_producto = req.params.id;
  const product = await container.getProductById(parseInt(id))
  if(product) {
    res.json(product);
  } else {
    res.json({error: "Producto no encontrado"})
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
