import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import doctorRoutes from "./routes/doctor.route";
import pacienteRoutes from "./routes/paciente.route";
import citasRoutes from "./routes/cita.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dbURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/gestion-citas-medicas";

mongoose
  .connect(dbURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Servidor conectado");
});

app.use("/api/doctores", doctorRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/citas", citasRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/`);
});
