import { api } from "./api";
import { Paciente } from "../types";

export const getAllPacientes = () => api.get("/pacientes");
export const getPacienteById = (id: string) => api.get(`/pacientes/${id}`);
export const createPaciente = (data: Paciente) => api.post("/pacientes", data);
export const updatePaciente = (id: string, data: Partial<Paciente>) =>
  api.put(`/pacientes/${id}`, data);
export const deletePaciente = (id: string) => api.delete(`/pacientes/${id}`);
