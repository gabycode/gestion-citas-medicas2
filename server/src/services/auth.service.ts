import { DoctorModel } from "../models/DoctorSchema";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { generateOtp } from "../utils/generateotp";
import { sendOtpEmail } from "../utils/SendOtpEmail";


export const register = async (data: any) => {
  const existing = await DoctorModel.findOne({ email: data.email });
  if (existing) throw new Error("El correo ya está registrado");

  const hashed = await bcrypt.hash(data.password, 10);
  const doctor = new DoctorModel({ ...data, password: hashed });
  return await doctor.save();
};

export const login = async ({ email, password }: any) => {
  const doctor = await DoctorModel.findOne({ email });
  if (!doctor) throw new Error("Credenciales inválidas");

  const isValid = await bcrypt.compare(password, doctor.password);
  if (!isValid) throw new Error("Credenciales inválidas");

  const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  return token;
};

export const sendOtp = async (email: string) => {
  const doctor = await DoctorModel.findOne({ email });
  if (!doctor) throw new Error("Correo no encontrado");

  const otp = generateOtp();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  doctor.otp = otp;
  doctor.otpExpires = expires;
  await doctor.save();

  await sendOtpEmail(email, doctor.nombre, otp);
};

export const resetPassword = async ({ email, otp, newPassword }: any) => {
  const doctor = await DoctorModel.findOne({ email, otp });
  if (!doctor || !doctor.otpExpires || doctor.otpExpires < new Date()) {
    throw new Error("OTP inválido o expirado");
  }

  doctor.password = await bcrypt.hash(newPassword, 10);
  doctor.otp = undefined;
  doctor.otpExpires = undefined;
  await doctor.save();
};

export const getProfile = async (doctorId: string) => {
  const doctor = await DoctorModel.findById(doctorId).select("-password");
  if (!doctor) throw new Error("No autorizado");
  return doctor;
};