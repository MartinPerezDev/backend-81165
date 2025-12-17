import express from "express";
import productsRouter from "./routes/products.router.js";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";
import __dirname from "../dirname.js";
import { errorHandler } from "./middlewares/error.middleware.js";

//incializamos las variables de entorno
dotenv.config({ path: __dirname + "/.env" });

const app = express();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
const PORT = process.env.PORT || 8080 ;

connectMongoDB();

//endpoints
app.use("/api/products", productsRouter);


app.use(errorHandler);

app.listen(PORT, ()=> {
  console.log("Servidor iniciado correctamente!");
});