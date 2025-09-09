import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";

// crear la app
const app = express();

// hablitar PUG
app.set("view engine", "pug");
app.set("views", "./views");

// carpeta publica
app.use(express.static("public"));

// routing
app.use("/auth", usuarioRoutes);

// definir un puerto
const port = 3000;
// arrancar el servidor
app.listen(port, () => {
    console.log(`\nEl servidor esta funcionando en el puerto ${port}`);
    console.log("http://localhost:3000/auth/login");
});
