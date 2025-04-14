import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { setupSwagger } from './swagger';

import doctorRoutes from "./src/routes/doctor.route";
import pacienteRoutes from "./src/routes/paciente.route";
import citasRoutes from "./src/routes/cita.route";
import authRoutes from "./src/routes/auth.route"
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

const dbURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/gestion-citas-medicas";

mongoose
  .connect(dbURI)
  .then(async () => {
    console.log("✅ MongoDB conectado");

    await seedDoctores();

    app.use("/api/auth", authRoutes);
    app.use("/api/doctores", doctorRoutes);
    app.use("/api/pacientes", pacienteRoutes);
    app.use("/api/citas", citasRoutes);

    // Ruta raíz
    app.get("/", (req, res) => {
      res.send("Servidor conectado");
    });

    // 🚀 Levantamos el servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}/`);
      console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });
