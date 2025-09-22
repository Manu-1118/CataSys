import { DataTypes } from "sequelize";
import db from "../config/db.js";
import bcrypt from "bcrypt";

const Usuario = db.define("usuarios", {
    nombre: {
        type: DataTypes.STRING,
        allwowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    clave: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
},
{
    hooks: {
        beforeCreate: async function(usuario) {
            const salt = await bcrypt.genSalt(10); // generar un salt de 10 rondas
            usuario.clave = await bcrypt.hash(usuario.clave, salt); // hashear la clave con el salt
        }
    }
}
);

export default Usuario;