import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./src/utils/logger";
import { seedDoctores } from "./src/seeds/doctores.seed";
import app from "./src/app";

dotenv.config();

const PORT = process.env.PORT || 3030;
const dbURI = process.env.MONGO_URI || "mongodb://localhost:27017/gestion-citas-medicas";

mongoose
  .connect(dbURI)
  .then(async () => {
    logger.info("✅ MongoDB conectado");

    await seedDoctores();
    logger.info("🌱 Seeding de doctores completado");

    app.listen(PORT, () => {
      logger.info(`🚀 Servidor corriendo en http://localhost:${PORT}/`);
      logger.info(`📚 Swagger disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    logger.error("❌ Error al conectar a MongoDB:", err);
  });
