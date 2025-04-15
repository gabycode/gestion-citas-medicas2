import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import logger from "./src/utils/logger";
import { setupSwagger } from "./swagger";

import doctorRoutes from "./src/routes/doctor.route";
import pacienteRoutes from "./src/routes/paciente.route";
import citasRoutes from "./src/routes/cita.route";
import authRoutes from "./src/routes/auth.route";
import { seedDoctores } from "./src/seeds/doctores.seed";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Config Swagger
setupSwagger(app);

// Configuración de variables de entorno
dotenv.config();

// URI de conexión a MongoDB
const dbURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/gestion-citas-medicas";

// Conexión a MongoDB
mongoose
  .connect(dbURI)
  .then(async () => {
    logger.info("✅ MongoDB conectado");

    await seedDoctores();
    logger.info("🌱 Seeding de doctores completado");

    // Rutas
    app.use("/api/auth", authRoutes);
    app.use("/api/doctores", doctorRoutes);
    app.use("/api/pacientes", pacienteRoutes);
    app.use("/api/citas", citasRoutes);

    // Ruta raíz
    app.get("/", (req, res) => {
      logger.info("🌐 Ruta raíz accedida");
      res.send("Servidor conectado");
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      logger.info(`🚀 Servidor corriendo en http://localhost:${PORT}/`);
      logger.info(
        `📚 Documentación Swagger en http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    logger.error("❌ Error al conectar a MongoDB:", err);
  });
