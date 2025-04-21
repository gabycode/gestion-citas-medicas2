import { Document } from "mongoose";

export interface IDoctor extends Document {
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  email: string;
  password: string;
  otp?: string;
  otpExpires?: Date;
}