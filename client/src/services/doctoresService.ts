import { api } from "./api";
import { DoctorLoginForm, DoctorRegisterForm, ResetPasswordForm } from "../types";

export const registerDoctor = (data: DoctorRegisterForm) =>
  api.post("/auth/signup", data);

export const loginDoctor = (data: DoctorLoginForm) =>
  api.post("/auth/login", data);

export const sendOtp = (email: string) =>
  api.post("/auth/forgot-password", { email });

export const resetPassword = (data: ResetPasswordForm) =>
  api.post("/auth/reset-password", data);

export const getDoctorProfile = (token: string) =>
  api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllDoctores = () => api.get("/doctores");

export const obtenerCitasDelDoctor = async (token: string) => {
  const response = await api.get("/doctores/citas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
