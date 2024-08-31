import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(process.env.DB_SEQUELIZE_URL, {
  dialectOptions: {
    ssl: {
      require: false,
    },
  }, // Permite conectarnos
  models: [__dirname + "/../models/**/*"], // Permite ubicar las tablas
  logging: false, // Deshabilita los logs por defecto
});

export default db;
