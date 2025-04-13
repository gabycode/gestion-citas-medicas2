import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

import doctorRoutes from "./routes/doctor.route";
import pacienteRoutes from "./routes/paciente.route";
import citasRoutes from "./routes/cita.route";
import { seedDoctores } from "./seeds/doctores.seed";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(bodyParser.json());

const dbURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/gestion-citas-medicas";

mongoose
  .connect(dbURI)
  .then(async () => {
    console.log("✅ MongoDB conectado");

    await seedDoctores();
    
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
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err);
  });
