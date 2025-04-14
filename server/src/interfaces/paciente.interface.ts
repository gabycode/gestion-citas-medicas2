import { Document } from "mongoose";

export interface IPaciente extends Document {
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
}
