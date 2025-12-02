import express from "express";
import ProductManager from "../productManager.js";
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

productsRouter.post("/", uploader.single("file") ,async(req, res)=> {
  try {
    //recibir data del formulario
    const title = req.body.title;
    const price = parseInt(req.body.price);
    const thumbnail = "/img/"+ req.file.filename;
  
    await productManager.addProduct({ title, price, thumbnail });
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
})

export default productsRouter;