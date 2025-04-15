// types/index.ts

export interface Doctor {
  _id: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  telefono: string;
  email: string;
  password?: string;
  otp?: string;
  otpExpires?: Date;
}

export interface DoctorLoginForm {
  email: string;
  password: string;
}

export interface DoctorRegisterForm {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  especialidad: string;
  password: string;
}

export interface ResetPasswordForm {
  email: string;
  otp: string;
  newPassword: string;
}

export interface CitaForm {
  fecha: string;
  hora: string;
  doctor: string; // ID del doctor
  paciente: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
  };
}

export interface Cita {
  _id: string;
  fecha: string;
  hora: string;
  doctor: Doctor;
  paciente: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
  };
}
