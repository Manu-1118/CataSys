import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const db = new Sequelize(
    process.env.DB_NOMBRE,
    process.env.DB_USER,
    process.env.DB_PASSWORD ?? "",
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: 3306,
        define: {
            timestamps: true,
        },
        pool: {
            max: 5, // max de conecciones en la bd
            min: 0, // min de conecciones en la bd
            acquire: 30000, // tiempo maximo que se espera para conectar a la bd
            idle: 10000, // tiempo maximo que una coneccion puede estar inactiva antes de ser terminada
        },
        operatorAliases: false,
    }
);

export default db;
