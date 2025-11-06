const products = [
  {
    id: 1,
    title: "Auriculares Redragon",
    description: "Auriculares para pc",
    price: 140,
    thumbnail: "",
    code: "1AX23G",
    stock: 4
  },
  {
    id: 2,
    title: "Teclado Corsair",
    description: "Teclado inalambrico",
    price: 210,
    thumbnail: "",
    code: "5GT333",
    stock: 19
  }
]

class ProductManager {
  #admin;

  constructor(products) {
    this.products = products;
    this.#admin = true;
  }

  getProducts() {
    return { message: "Lista de products", products: this.products };
  }

  deleteProductById(pid) {
    try {
      /*
      if (this.#admin) {
        const newProducts = this.products.filter((product) => product.id !== pid);
        this.products = newProducts;

        return { message: "Producto eliminado", products: this.products };
      } else {
        throw new Error("Permiso Denegado");
      }
      */

      if (!this.#admin) throw new Error("Permiso Denegado");

      const newProducts = this.products.filter((product) => product.id !== pid);
      this.products = newProducts;

      return { message: "Producto eliminado", products: this.products };
    } catch (error) {
      return { message: error.message };
    }
  }

  generateId() {
    if(this.products.length > 0){
      return this.products[ this.products.length - 1 ].id + 1;
    }else{
      return 1;
    }
  }

  addProduct(newProduct) {
    try {
      if (!this.#admin) throw new Error("Permiso Denegado");

      const id = this.generateId();
      this.products.push({ id, ...newProduct });
      return { message: "Producto agregado", products: this.products };
    } catch (error) {
      return { message: error.message };
    }
  }

  updateProductById(pid, update){
    try {
      if (!this.#admin) throw new Error("Permiso Denegado");

      const indexProduct = this.products.findIndex( (product) => product.id === pid );
      if(indexProduct === -1) throw new Error("El producto no existe");

      this.products[indexProduct] = { ...this.products[indexProduct], ...update };
      return { message: "Producto Actualizado", products: this.products };
    } catch (error) {
      return { message: error.message };
    }
  }
}

const productManager = new ProductManager(products);

console.log(productManager.getProducts());
console.log(productManager.deleteProductById(1));
const newProducts = productManager.addProduct({
  title: "Auriculares Rojos",
  description: "Auriculares para pc rojos",
  price: 299,
  thumbnail: "",
  code: "1AH23G",
  stock: 6
});

console.log(newProducts);
console.log( productManager.updateProductById(2, { price: 1400, stock: 2 }) );