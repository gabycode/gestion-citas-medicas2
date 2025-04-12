import mongoose, { Document } from "mongoose";

export interface Cita extends Document {
  fecha: Date;
  hora: string;
  paciente: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
}
