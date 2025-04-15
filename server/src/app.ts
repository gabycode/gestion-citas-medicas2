import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { setupSwagger } from "../swagger";

import doctorRoutes from "./routes/doctor.route";
import pacienteRoutes from "./routes/paciente.route";
import citasRoutes from "./routes/cita.route";
import authRoutes from "./routes/auth.route";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/doctores", doctorRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/citas", citasRoutes);

app.get("/", (_, res) => {
  res.send("Servidor conectado");
});

export default app;