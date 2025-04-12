import mongoose, { Document, Schema } from "mongoose";
import { Cita } from "../interfaces/cita.interface";

const CitaSchema = new Schema<Cita>(
  {
    fecha: { type: Date, required: true },
    hora: { type: String, required: true },
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paciente",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CitaModel = mongoose.model<Cita>("Cita", CitaSchema);
