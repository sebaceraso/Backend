const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "products.json";
  }
  //FUNCION PARA LEER LA INFORMACION
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(product) {
    try {
      let data = await this.getProducts();
      console.log(data);
      const searchCode = this.products.find((p) => p.code === product.code);
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
      const lastProductId = data.lenght > 0 ? data[data.lenght - 1].id + 1 : 1;
      const newProduct = { ...product, id: lastProductId };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile("products.json", productString);
      return newProduct;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductsById(id) {
    try {
      let data = await this.getProducts();
      const productFound = this.products.find((product) => product.id === id);

      if (!productFound) {
        throw new Error("Producto no encontrado");
      }
      return productFound;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProduct(id, update) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        throw new error("No se encuentra el id: " + id);
      }

      const updatedProduct = { ...products[index], ...update };
      products.splice(index, 1, updatedProduct);

      const data = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, data);
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);

      if (index === -1) {
        throw new error("no se encuentra el id " + id);
      }

      products.splice(index, 1);
      const data = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.path, data);
    } catch (err) {
      console.log(err);
    }
  }
}

const productsManager = new ProductManager();
const asyncFn = async () => {
    await productsManager.addProduct(product1);
    await productsManager.addProduct(product2);
    await productsManager.addProduct(product3);
    await productsManager.addProduct(product4);
    await productsManager.addProduct(product5);
    await productsManager.addProduct(product6);
    await productsManager.addProduct(product7);
    await productsManager.addProduct(product8);
    await productsManager.addProduct(product9);
    await productsManager.addProduct(product10);
//   console.log(await productsManager.getProductsById(1));
};
asyncFn();

const product1 = {
  title: "pelota 10",
  description: "FF",
  price: 110,
  thumbnail: "Sin foto",
  code: "109",
  stock: 10,
};
const product2 = {
  title: "pelota 1",
  description: "Nike",
  price: 20,
  thumbnail: "Sin foto",
  code: "100",
  stock: 10,
};
const product3 = {
  title: "pelota 2",
  description: "Adidas",
  price: 30,
  thumbnail: "Sin foto",
  code: "101",
  stock: 10,
};
const product4 = {
  title: "pelota 3",
  description: "Fila",
  price: 40,
  thumbnail: "Sin foto",
  code: "102",
  stock: 10,
};
const product5 = {
  title: "pelota 4",
  description: "Umbro",
  price: 50,
  thumbnail: "Sin foto",
  code: "103",
  stock: 10,
};
const product6 = {
  title: "pelota 5",
  description: "Drumond",
  price: 60,
  thumbnail: "Sin foto",
  code: "104",
  stock: 10,
};
const product7 = {
  title: "pelota 6",
  description: "Montagne",
  price: 70,
  thumbnail: "Sin foto",
  code: "105",
  stock: 10,
};
const product8 = {
  title: "pelota 7",
  description: "Puma",
  price: 80,
  thumbnail: "Sin foto",
  code: "106",
  stock: 10,
};
const product9 = {
  title: "pelota 8",
  description: "NB",
  price: 90,
  thumbnail: "Sin foto",
  code: "107",
  stock: 10,
};
const product10 = {
  title: "pelota 9",
  description: "JK",
  price: 100,
  thumbnail: "Sin foto",
  code: "108",
  stock: 10,
};

module.exports = ProductManager;