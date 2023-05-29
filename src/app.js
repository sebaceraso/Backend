import  express  from "express";
import { productsRouter } from "./routes/routes.products.js";
import { cartsRouter } from "./routes/routes.carts.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.get("*", (req, res) => { //Si no se encuentra alguna ruta por x motivo, se devuelve esta ruta por defecto. 
  res.status(404).json ({
    status: "Error",
    msg: "Route does not exist"
  })
  
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
})
