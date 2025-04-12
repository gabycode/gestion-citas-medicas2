import { Document } from "mongoose";

export interface Paciente extends Document {
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
}
