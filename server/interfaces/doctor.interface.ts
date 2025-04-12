import { Document } from "mongoose";

export interface Doctor extends Document {
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  email: string;
}
