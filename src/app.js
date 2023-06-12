import  express  from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import path from "path";
import { productsRouter } from "./routes/routes.products.js";
import { cartsRouter } from "./routes/routes.carts.js";
import { Server } from "socket.io"; 
import { realTimeProducts } from "./routes/router.realTimeProducts.js";
import { routerHome } from "./routes/router.home.js";


const app = express();
const PORT = 8080;


// HANDLEBARS
app.engine("handlebars", handlebars.engine());//HANDLEBARS, LO CREAMOS
app.set("views", __dirname+"/views");//HANDLEBARS
app.set("view engine","handlebars");//HANDLEBARS, LO SETEAMOS

//PUBLIC
app.use(express.static(path.join(__dirname, "/public")));//join= juntame la ruta del proyecto con public.

//EXPRESS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rutas API REST CON JSON
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//Rutas HTML RENDER SERVER SIDE = DEVUELVO EL HTML
//app.use("/products", productsHtmlRouter);

//Rutas SOCKET
app.use("/realtimeproducts", realTimeProducts);
app.use("/home", routerHome)

//Ruta POR DEFECTO
app.get("*", (req, res) => { //Si no se encuentra alguna ruta por x motivo, se devuelve esta ruta por defecto. 
  res.status(404).json ({
    status: "Error",
    msg: "Route does not exist"
  })
});

//SERVIDOR HTTP
const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
})

//SERIVDOR SOCKET
const socketServer = new Server(httpServer);



socketServer.on("connection", (socket) => { //El BACK abre la conexion
  console.log("se abrio un canal de soket" + socket.id); //Cuando alguien se conecte al socket(front), se hace un console del id.
  // setInterval(() => {
  //   socket.emit("msg_back_to_front", { //El BACK emite un mensaje cada 2 segundos
  //     msg: Date.now() + " hola desde el back al socket",
      
  //   });

  //   socket.broadcast.emit("msg_back_to_todos_menos_socket", {
  //     msg: "hola desde el back a todos menos el socket",
  //   });

  //   socketServer.emit("msg_back_todos", { msg: "hola desde el back a todos" });
  // }, 2000);

  // socket.on("msg_front_to_back", (data) => { //El BACK ataja los mensajes del socket
  //   console.log(JSON.stringify(data));
  });
