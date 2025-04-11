import { api } from "./api";
import { Cita } from "../types";

export const getAllCitas = () => api.get("/citas");
export const getCitaById = (id: string) => api.get(`/citas/${id}`);
export const createCita = (data: Cita) => api.post("/citas", data);
export const updateCita = (id: string, data: Partial<Cita>) =>
  api.put(`/citas/${id}`, data);
export const deleteCitas = (id: string) => api.delete(`/citas/${id}`);

export const obtenerCitasDelDoctor = async (token: string) => {
  const response = await api.get("/doctor/citas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
