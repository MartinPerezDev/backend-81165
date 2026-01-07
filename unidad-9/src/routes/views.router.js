import express from "express";
import Product from "../models/product.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res, next)=> {
  try {
    const { limit = 10, page = 1 } = req.query;

    const productsData = await Product.paginate({}, { limit, page, lean: true });
    const products = productsData.docs;
    delete productsData.docs;

    const links = [];

    for(let index = 1; index <= productsData.totalPages; index++ ){
      links.push({ text: index, link: `?limit=${limit}&page=${index}` });
    };

    res.render("home", { products, links });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;