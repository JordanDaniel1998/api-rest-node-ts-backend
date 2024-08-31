import express, { request, response } from "express";
import router from "./router";
import colors from "colors";
import db from "./config/db";
import swaggerUi from "swagger-ui-express";
import swaggerSpecification, { swaggerUiOptions } from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate(); // Autenticate a la BD por medio de nuestra conexión
    db.sync(); // Permita actualizar la BD según vayamos modificando
    /*  console.log(colors.bgGreen.bold("La conexión a la BD fue establecida")); */
  } catch (error) {
    console.log(colors.bgRed.bold("Hubo un error al conectar la BD"));
  }
}

connectDB();

const server = express();

// Configuración de CORS
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      // null -> No hay error | true -> Permitir la conexión
      callback(null, true);
    } else {
      // new Error -> Si hay error | false -> Denegar la conexión
      callback(new Error("Error de CORS"), false);
    }
  },
};
server.use(cors(corsOptions));

// Permite leer las respuestas de tipo json
server.use(express.json());

// Permite obtener información de la solicitud que se está realizando
server.use(morgan("dev"));

server.use("/api/products", router);

// Docs
server.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecification, swaggerUiOptions)
);

export default server;

// server.use() -> se ejecutan en cada petición que el cliente realiza
