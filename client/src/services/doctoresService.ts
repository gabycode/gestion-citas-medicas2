import { api } from "./api";
import { Doctor } from "../types";

export const getAllDoctores = () => api.get("/doctores");
export const getDoctorById = (id: string) => api.get(`/doctores/${id}`);
export const createDoctor = (data: Doctor) => api.post("/doctores", data);
export const updateDoctor = (id: string, data: Partial<Doctor>) =>
  api.put(`/doctores/${id}`, data);
export const deleteDoctor = (id: string) => api.delete(`/doctores/${id}`);
