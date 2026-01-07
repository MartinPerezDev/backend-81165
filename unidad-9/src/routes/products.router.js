import express from "express";
import { getAllProducts, addProduct, setProductById, deleteProductById } from "../controllers/products.controller.js"

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/", addProduct);

productsRouter.put("/:pid", setProductById);

productsRouter.delete("/:pid", deleteProductById);

export default productsRouter;