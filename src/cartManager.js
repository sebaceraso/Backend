import fs from "fs";

export default class cartManager {
  constructor(path) {
    this.path = "./src/carts.json";
  }
  //Crear un carrito con un id y productos(por su nombre), el carrito es un array de carritos(objeto)

  async readCart() {
    try {
      if (fs.existsSync(this.path)) {
        const dataCarrito = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(dataCarrito);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      throw error;
    }
  }

  async readCarById(cartId) {
    try{
      let carritoId = await this.readCart()
      const carritoEncontradoPorId = carritoId.find(cart => cart.id === cartId);//Igualo el parametro que le paso al metodo cartId con la propiedad del carrito, Id.
      if (!carritoEncontradoPorId) {
        return ("Carrito no encontrado");
      }
      return carritoEncontradoPorId;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async addNewCart(carrito) {
    try {
      let dataCarrito = await this.readCart();
      let id =
        dataCarrito.length > 0 ? dataCarrito[dataCarrito.length - 1].id + 1 : 1; //datacarrito.length -1 = me tomo el ultimo valor de mi array, en este caso 0
      carrito = { id, ...carrito, products: [] }; //ver como funciona carrito
      dataCarrito.push(carrito);
      await fs.promises.writeFile(this.path, JSON.stringify(dataCarrito));
      return carrito, "Carrito creado";
    } catch (error) {
      console.error(error);
    }
  }

  async updateCart(idCarrito, idProducto) {
    try {
      let dataCarrito = await this.readCart();
      let productosEnJson = await fs.promises.readFile("./products.json", "utf-8");
      
      let productos = productosEnJson ? JSON.parse(productosEnJson) : []; //Si existe productosEnJson, parsearlo, sino crear el array
      let carritoEncontrado = dataCarrito.find((e) => e.id == idCarrito); //igualo la informacion del carrito y lo encuentro
      
      //const productosEncontrados = Object.assign({},{ id: productos.find((e) => e.id == idProducto).id });//object.assing = en este caso clona los productos encontrados cuando coincide el id de productos.json con el parametro idProducto y este nuevo objeto se crea solo con la propiedad ID, pero generalemente combina 2 objetos en 1 nuevo objeto, las propiedades de nuestros objetos iniciales se copian en un solo: nuevoObjeto = object.assign({objeto1},{objeto2})
      const productosEncontrados = {id: productos.find(e => e.id == idProducto).id};
      let productosDelCarrito = carritoEncontrado.products;// Aca accedo a la propiedad products, que dentro va a tener idProduct y quantity
      
      if(productosDelCarrito.find(e => e.id == productosEncontrados.id )) {
        productosEncontrados.quantity++;
        productosDelCarrito.find(e => e.id == productosEncontrados.id).quantity++;
        await fs.promises.writeFile(this.path, JSON.stringify(dataCarrito, null, 4),"utf-8");
        return productosDelCarrito;
      }
      productosEncontrados.quantity = 1;
      carritoEncontrado.products.push(productosEncontrados)
      await fs.promises.writeFile(this.path, JSON.stringify(dataCarrito, null, 4),"utf-8");


    } catch (error) {
        return error;
     }
  }
}

// const carrito = new cartManager("carts.json");
// async function cartInteraction() {
//   // console.log(await carrito.addNewCart());
//   console.log(await carrito.updateCart(1,5));
// }

// cartInteraction();
