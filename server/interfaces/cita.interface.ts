import mongoose from "mongoose";

export interface ICita extends Document {
  fecha: Date;
  hora: string;
  paciente: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
}
