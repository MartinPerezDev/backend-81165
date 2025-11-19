import express from "express";
import ProductManager from "./productManager.js";

const app = express();
//habilitamos poder recibir data en formato json
app.use( express.json() );
const productManager = new ProductManager("./src/products.json");

//enpoints
app.get( "/", (req, res)=> {
  res.json({ message: "Hola Mundo!!!" });
});

app.get("/api/products", async(req, res)=> {
  try {
    const products = await productManager.getProducts();
  
    res.status(200).json({ message: "Lista de productos actualizada", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/products/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;
  
    const products = await productManager.deleteProductById(pid);
    res.status(200).json({ message: "Producto Eliminado", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async(req, res)=> {
  try {
    const newProduct = req.body;

    const products = await productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto añadido", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/products/:pid", async(req, res)=> {
  try {
    const pid = req.params.pid;
    const updates = req.body;

    const products = await productManager.setProductById(pid, updates);
    res.status(200).json({ message: "Producto actualizado", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//devolver un producto buscado a traves de su id
app.get("/api/products/:pid", async(req, res)=> {});

// /api/carts

//este metodo crea carritos vacios
app.post("/api/carts", async(req, res)=> {});

//este metodo trae los productos de un carrito elegido por su id
app.get("/api/carts/:cid", async(req, res)=> {});

//
app.post("/api/carts/:cid/product/:pid", async(req, res)=> {});


app.listen(8080, ()=> {
  console.log("Servidor iniciado en el puerto 8080");
});
