import express from "express";
import Cart from "../models/cart.model.js";
import { throwHttpError } from "../utils/httpError.js";

const cartsRouter = express.Router();

cartsRouter.post("/", async(req, res, next) => {
  try {
    const cart = await Cart.create({});
    res.status(201).json({ status: "success", payload: cart });
  } catch (error) {
    next(error);
  }
});

cartsRouter.post("/:cid/product/:pid", async(req, res, next)=> {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    //verificar que el producto exista

    //verificar que el carrito exista

    //verificar si el producto existe en el carrito
      //si existe, incrementar la cantidad
      //si no existe, agregarlo como nuevo
    const updatedCart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity } } }, { new: true, runValidators: true });
    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    next(error);
  }
});

cartsRouter.get("/:cid", async(req, res, next) => {
  try {
    const cid = req.params.cid;
    const cart = await Cart.findById(cid).populate("products.product");
    if(!cart) throwHttpError("Carrito no encontrado", 404);

    res.status(200).json({ status: "success", payload: cart.products });
  } catch (error) {
    next(error);
  }
});

export default cartsRouter;