import mongoose, { Schema } from "mongoose";
import { IPaciente } from "../interfaces/paciente.interface";

const PacienteSchema: Schema = new Schema<IPaciente>(
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

export const PacienteModel = mongoose.models.Paciente || mongoose.model<IPaciente>("Paciente", PacienteSchema);
