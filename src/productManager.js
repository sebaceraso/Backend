import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = "./src/products.json" // ./ indica que creo el archivo donde esta ubicado productManager.js, en este caso src.
  }
  //FUNCION PARA LEER LA INFORMACION
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        //console.log(data);
        return JSON.parse(data);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
        throw (error);
    }
  }

  async addProduct(product) {
    try {
      let data = await this.getProducts();
      const searchCode = data.find((p) => p.code === product.code);
      if (searchCode) {
        return "Este codigo ya existe";
      }
      if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return "Algun campo esta incompleto";
      }
      let id;
      data.length > 0 ? id=data[data.length - 1].id + 1 : id=1;
      product = { id, ...product};
      data.push(product);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, productString);
      return product;
    } catch (error) {
        console.error(error);
    }
  }

  async getProductsById(id) {
    try {
      let data = await this.getProducts();
      const productFound = data.find((product) => product.id === id);
      if (!productFound) {
        throw new Error("Producto no encontrado");
      }
      return productFound;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async updateProduct(id, update) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        throw new error("No se encuentra el id: " + id);
      }

      const updatedProduct = { ...products[index], ...update };// los 3 puntos del spread operator de update me va a permitir actualizar las propiedades y no eliminar las que no les pase por update.
      products.splice(index, 1, updatedProduct);//index= donde empieza, 1 = corta en la posicion,o sea en un solo elemento, lo que borra, updateProduct= el item que voy a modificar

      const data = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, data);
    } catch (error) {
      throw new error(error);
    }
  };

  async deleteProduct(id) {
    try {
      let data = await this.getProducts();
      const index = data.findIndex((product) => product.id === id);
      if (index === -1) {
        console.log("no se encuentra el id " + id);
      }
      data.splice(index, 1);
      data = JSON.stringify(data, null, 2);
      await fs.promises.writeFile(this.path, data);
    } catch  (error) {
      throw new error(error);
    }
  };
}


const product1 = {
  title: "Mi Smart Band 7",
  description: "Xiaomi, malla negra",
  price: 110,
  thumbnail: "Sin foto",
  code: "100",
  stock: 10
};
const product2 = {
  title: "W26",
  description: "Microwear, malla rosa",
  price: 20,
  thumbnail: "Sin foto",
  code: "101",
  stock: 10
};
const product3 = {
  title: "Zl02d",
  description: "OEM",
  price: 30,
  thumbnail: "Sin foto",
  code: "102",
  stock: 10
};
const product4 = {
  title: "Moto Watch 100",
  description: "Motorola",
  price: 50,
  thumbnail: "Sin foto",
  code: "103",
  stock: 10
};
const product5 = {
  title: "W26+ PLUS",
  description: "Microwear, malla negra ",
  price: 50,
  thumbnail: "Sin foto",
  code: "104",
  stock: 10
};
const product6 = {
  title: "Futurefit Ultra 2",
  description: "HiFuture",
  price: 60,
  thumbnail: "Sin foto",
  code: "105",
  stock: 10
};
const product7 = {
  title: "NT03",
  description: "Nictom, malla blanca",
  price: 70,
  thumbnail: "Sin foto",
  code: "106",
  stock: 10
};
const product8 = {
  title: "Forerunner 55",
  description: "Garmin",
  price: 80,
  thumbnail: "Sin foto",
  code: "107",
  stock: 10
};
const product9 = {
  title: "Andina",
  description: "JD",
  price: 90,
  thumbnail: "Sin foto",
  code: "108",
  stock: 10
};
const product10 = {
  title: "CF80",
  description: "Genérica",
  price: 100,
  thumbnail: "Sin foto",
  code: "109",
  stock: 10
};

// const productsManager = new ProductManager("products.json");
// async function productInteraction () {
//     console.log(await productsManager.addProduct(product1));
//     console.log(await productsManager.addProduct(product2));
//     console.log(await productsManager.addProduct(product3));
//     console.log(await productsManager.addProduct(product4));
//     console.log(await productsManager.addProduct(product5));
//     console.log(await productsManager.addProduct(product6));
//     console.log(await productsManager.addProduct(product7));
//     console.log(await productsManager.addProduct(product8));
//     console.log(await productsManager.addProduct(product9));
//     console.log(await productsManager.addProduct(product10));
//     console.log(await productsManager.deleteProduct(4));
// }

// productInteraction();