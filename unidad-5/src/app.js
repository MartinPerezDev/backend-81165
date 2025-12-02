import express from "express";
import { engine } from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";

const app = express();
//habilitamos la carpeta public para archivos estaticos
app.use( express.static("public") );
//habilitamos poder recibir data desde formularios
app.use( express.urlencoded({ extended: true }) );

//handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");



//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter)

app.listen(8080, ()=> {
  console.log("Servidor iniciado correctamente!");
});