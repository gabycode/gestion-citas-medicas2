export interface Paciente {
  _id?: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
}

export interface Doctor {
  _id?: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  correo: string;
}

export interface Cita {
  _id?: string;
  fecha: Date;
  hora: string;
  paciente: string;
  doctor: string;
}

export interface CitaForm {
  fecha: string;
  hora: string;
  doctor: string;
  paciente: {
    nombre: string;
    apellido: string;
    telefono: string;
    correo: string;
  };
}
