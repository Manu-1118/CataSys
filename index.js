import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";

// crear la app
const app = express();

// habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// conectar a la base de datos
try {
    await db.authenticate();
    db.sync();
} catch (error) {
    console.log("Error: ", error);
}

// hablitar PUG
app.set("view engine", "pug");
app.set("views", "./views");

// carpeta publica
app.use(express.static("public"));

// routing
app.use("/auth", usuarioRoutes);

// definir un puerto
const port = process.env.PORT || 3000;
// arrancar el servidor
app.listen(port, () => {
    console.clear();
    console.log("==================================");
    console.log("=== Sistema de gestion CataSys ===");
    console.log("==================================");
    console.log("\nEl servidor esta funcionando:");
    console.log("http://localhost:3000/auth/login\n");
});
