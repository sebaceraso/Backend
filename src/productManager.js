const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.id = 0;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    if (!title && !description && !price && !thumbnail && !stock && !code) {
      console.error("Le falto agregar un dato del producto");
      return;
    }

    const codes = this.products.map((product) => product.code);

    if (codes.includes(code)) {
      console.error(`Codigo existente ${code}`);
      return;
    }

    this.products.push({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ++this.id,
    });

    return await fs.promises.writeFile(
      this.path,
      JSON.stringify(this.products, null, 2)
    );
  };

  getProducts = async () => {
    try {
      let productString = await fs.promises.readFile(this.path, "utf-8");
      let products = JSON.parse(productString);
      console.log(products);
      return products;
    } catch (err) {
      throw err;
    }
  };

  getProductsById = async (idProduct) => {
    try {
      const products = await this.getProducts();
      const getId = products.find((product) => product.id === idProduct);
      console.log(getId);
      return getId;
    } catch (error) {
      throw error;
    }
  };

  updateProduct = async (id, update) => {
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
  };

  deleteProduct = async (id) => {
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
  };
}

const productManager = new ProductManager("./src/productos.json");
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "109", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "119", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "29", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "239", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "302", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "123", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "321", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "346", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "166", 10);
productManager.addProduct("pelota 10", "FF", 110, "Sin foto", "128", 10);

module.exports = ProductManager;