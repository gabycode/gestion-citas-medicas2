import mongoose, { Schema } from "mongoose";
import { Paciente } from "../interfaces/paciente.interface";

const PacienteSchema: Schema = new Schema<Paciente>(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    telefono: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const PacienteModel = mongoose.model<Paciente>(
  "Paciente",
  PacienteSchema
);
