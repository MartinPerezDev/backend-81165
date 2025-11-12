import fs from "fs/promises";
import crypto from "crypto";

class ProductManager {

  constructor(pathFile) {
    this.pathFile = pathFile
  }

  generateNewId() {
    return crypto.randomUUID();
  }

  async addProduct(newProduct) {
    try {
      //recuperar los productos
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const newId = this.generateNewId();
      const product = { id: newId, ...newProduct };
      products.push(product);

      //guardamos los productos en el json
      await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
      return products;
    } catch (error) {
      throw new Error("Error al añadir el nuevo producto: " + error.message);
    }
  }

  async getProducts() {
    try {
      //recuperar los productos
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      return products;
    } catch (error) {
      throw new Error("Error al traer los productos: " + error.message);
    }
  }

  async setProductById(pid, updates) {
    try {
      //recuperar los productos
      const products = await this.getProducts();

      const indexProduct = products.findIndex((product) => product.id === pid);
      if (indexProduct === -1) throw new Error("Producto no encontrado");

      products[indexProduct] = { ...products[indexProduct], ...updates };

      //guardamos los productos en el json
      await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
      return products;
    } catch (error) {
      throw new Error("Error al actualizar un producto: " + error.message);
    }
  }

  async deleteProductById(pid) {
    try {
      //recuperar los productos
      const products = await this.getProducts();

      const filteredProducts = products.filter((product) => product.id !== pid);

      //guardamos los productos en el json
      await fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2), "utf-8");
      return filteredProducts;
    } catch (error) {
      throw new Error("Error al borrar un producto: " + error.message);
    }
  }
}


async function main() {
  try {
    const productManager = new ProductManager("./products.json");

    //await productManager.addProduct({ title: "mouse", price: 300, stock: 5 });

    //await productManager.setProductById("bec0902d-64d3-4d40-9bc0-d1b5c27f4d55", { stock: 2 });

    await productManager.deleteProductById("1702dada-0657-42c9-ac6e-0033d3c9a2c7");

    const products = await productManager.getProducts();
    console.log(products);
  } catch (error) {
    console.log(error);
  }
}

main();