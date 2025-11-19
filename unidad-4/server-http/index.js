import http from "http";

const server = http.createServer( (req, res) => {
  res.setHeader("Content-Type", "text/plain");

  if( req.method === "GET" && req.url === "/" ){
    res.end("Hola Mundo!");
  }
  else if(req.method === "GET" && req.url === "/api/products"){
    res.end("Lista de productos");
  }
});

server.listen( 8080, () => {
  console.log("Servidor inciado en el puerto 8080!");
});