import mongoose, { Document, Schema } from "mongoose";
import { ICita } from "../interfaces/cita.interface";

const CitaSchema = new Schema<ICita>(
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

export const CitaModel = mongoose.model<ICita>("Cita", CitaSchema);
