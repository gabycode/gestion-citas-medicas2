import mongoose, { Schema } from "mongoose";
import { Doctor } from "../interfaces/doctor.interface";

const DoctorSchema: Schema = new Schema<Doctor>(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    especialidad: { type: String, required: true },
    telefono: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const DoctorModel = mongoose.model<Doctor>("Doctor", DoctorSchema);
