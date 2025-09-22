import { check, validationResult } from "express-validator";

import { generarId } from "../helpers/tokens.js";
import { correoRegistro } from "../helpers/correos.js";
import Usuario from "../models/Usuario.js";

const formularioLogin = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesión",
    });
};

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Crear Cuenta",
    });
};

const registrar = async (req, res) => {
    // validacion de la entrada
    await check("nombre")
        .notEmpty()
        .withMessage("El nombre es obligatorio")
        .run(req);
    await check("usuario")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio")
        .run(req);
    await check("correo")
        .isEmail()
        .withMessage("El correo es obligatorio")
        .run(req);
    await check("clave")
        .isLength({ min: 6 })
        .withMessage("La contraseña debe ser de al menos 6 caracteres")
        .run(req);
    await check("repetir_clave")
        .equals(req.body.clave)
        .withMessage("Las contraseñas no son iguales")
        .run(req);

    let resultado = validationResult(req);

    // veridficar que el resultado este vacio
    if (!resultado.isEmpty()) {
        // mostrar los errores si el arreglo no esta vacio
        return res.render("auth/registro", {
            pagina: "Crear Cuenta", // titulo de la pagina
            errores: resultado.array(), // errores a mostrar
            usuario: {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                correo: req.body.correo,
            },
        });
    } // fin de la validacion

    const { nombre, usuario, correo, clave } = req.body; // extraer los datos del formulario

    // verificar usuario duplicado
    const correoExiste = await Usuario.findOne({
        where: { correo },
    });
    const usuarioExiste = await Usuario.findOne({
        where: { usuario },
    });

    if (correoExiste || usuarioExiste) {
        return res.render("auth/registro", {
            pagina: "Crear Cuenta", // titulo de la pagina
            errores: [{ msg: "El correo o el usuario ya está registrado" }], // errores a mostrar
            usuario: {
                nombre: req.body.nombre,
                usuario: req.body.usuario,
                correo: req.body.correo,
            },
        });
    } // fin de la verificacion de duplicidad

    // almacenar un usuario
    const usuarioEmail = await Usuario.create({
        nombre,
        usuario,
        correo,
        clave,
        token: generarId(),
    });

    // enviar un email de confirmacion
    correoRegistro({
        nombre: usuarioEmail.nombre,
        correo: usuarioEmail.correo,
        token: usuarioEmail.token,
        usuario: usuarioEmail.usuario,
    });

    // mostrar mensaje de confirmacion
    res.render("templates/mensaje", {
        pagina: "Cuenta Creada Correctamente",
        mensaje: "Hemos enviado un correo de confirmación, presiona el enlace",
    });
};

const confirmar = async (req, res) => {
    const { token } = req.params;
};

const formularioRecuperacion = (req, res) => {
    res.render("auth/recuperacion", {
        pagina: "Recuperar Contraseña",
    });
};

export {
    formularioLogin,
    formularioRegistro,
    registrar,
    confirmar,
    formularioRecuperacion,
};
