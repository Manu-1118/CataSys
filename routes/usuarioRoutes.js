import express from "express";

import {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioRecuperacion,
} from "../controllers/usuarioController.js";

const router = express.Router();

router.get("/login", formularioLogin); // formulario de login
router.get("/registro", formularioRegistro); // formulario de registro
router.post("/registro", registrar); // registrar un usuario
router.get("/confirmar/:token", confirmar); 
router.get("/recuperacion", formularioRecuperacion); // formulario de recuperacion de contraseña

export default router;
