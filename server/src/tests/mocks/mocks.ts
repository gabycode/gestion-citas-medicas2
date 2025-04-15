import { IPaciente } from "../../interfaces/paciente.interface";
import { IDoctor } from "../../interfaces/doctor.interface";
import { ICita } from "../../interfaces/cita.interface";
import mongoose from "mongoose";

const generateObjectId = (seed: string) =>
  new mongoose.Types.ObjectId(seed.padEnd(24, "0"));

export const mockPaciente: Partial<IPaciente> & { _id: string } = {
  _id: generateObjectId("paciente1").toHexString(),
  nombre: "Juan",
  apellido: "Pérez",
  correo: "juan.perez@example.com",
  telefono: "8091234567",
};

export const mockDoctor = {
  _id: generateObjectId("doctor1").toHexString(),
  nombre: "María",
  apellido: "López",
  especialidad: "Cardiología",
  telefono: "8092345678",
  email: "maria.lopez@example.com",
  password: "$2a$10$1234567890123456789012",
} as IDoctor & { _id: string };

export const mockCita: Partial<ICita> & { _id: string } = {
  _id: generateObjectId("cita1").toHexString(),
  fecha: new Date("2025-06-01"),
  hora: "10:30",
  paciente: mockPaciente._id as any,
  doctor: mockDoctor._id as any,
};

export const mockCitaPopulated = {
  ...mockCita,
  paciente: mockPaciente,
  doctor: mockDoctor,
};

export const mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
};

export const mockEmailService = {
  sendAppointmentEmail: jest.fn().mockResolvedValue(true),
  sendCancelationEmail: jest.fn().mockResolvedValue(true),
  sendOtpEmail: jest.fn().mockResolvedValue(true),
};

export const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRequest = (body = {}, params = {}, query = {}) => ({
  body,
  params,
  query,
});

export const mockAuthToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRvY3RvcjEwMDAwMDAwMDAwMDAwMDAwMCIsImlhdCI6MTY0ODY0NzE2MCwiZXhwIjoxNjQ4NzMzNTYwfQ.example";

export const mockAuthRequest = (user = { id: mockDoctor._id }) => ({
  user,
  body: {},
  params: {},
  query: {},
});
