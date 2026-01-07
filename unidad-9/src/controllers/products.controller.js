import Product from "../models/product.model.js";
import { throwHttpError } from "../utils/httpError.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const { limit = 10 , page = 1 } = req.query;
    const productsData = await Product.paginate( {}, { limit, page, lean: true } );
    const products = productsData.docs;
    delete productsData.docs;

    res.status(200).json({ status: "success", payload: products, ...productsData });
  } catch (error) {
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    //lo ideal es antes verificar los datos con libreria "zod"
    const newProduct = await Product.create(req.body);

    res.status(201).json({ status: "success", payload: newProduct });
  } catch (error) {
    next(error);
  }
};

export const setProductById = async (req, res, next) => {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });
    if(!updatedProduct) throwHttpError("Producto no encontrado", 404);

    res.status(200).json({ status: "success", payload: updatedProduct });
  } catch (error) {
    next(error)
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const pid = req.params.pid;

    const deletedProduct = await Product.findByIdAndDelete(pid);
    if (!deletedProduct) throwHttpError("Producto no encontrado", 404)

    res.status(200).json({ status: "success", payload: deletedProduct });
  } catch (error) {
    next(error)
  }
};