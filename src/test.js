const express = require('express')

const app = express()
app.use(express.urlencoded({ extended: true }));
const port = 5000

console.log(productos)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/producto/:id', (req, res) => {
  const id_producto = req.params.id;
  // Aquí se puede utilizar el ID del producto para buscar información en una base de datos u otra fuente de datos
  res.send(`Mostrando información del producto con ID ${id_producto}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
