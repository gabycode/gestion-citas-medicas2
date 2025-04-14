import { DoctorModel } from "../models/DoctorSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateOtp } from "../utils/generateotp";
import { sendOtpEmail } from "../utils/SendOtpEmail";
import logger from "../utils/logger";

export const register = async (data: any) => {
  logger.info(
    { email: data.email },
    "Verificando email para registro de doctor"
  );
  const existing = await DoctorModel.findOne({ email: data.email });
  if (existing) {
    logger.warn(
      { email: data.email },
      "Intento de registro con email ya existente"
    );
    throw new Error("El correo ya está registrado");
  }

  logger.info({ email: data.email }, "Creando nuevo doctor");
  const hashed = await bcrypt.hash(data.password, 10);
  const doctor = new DoctorModel({ ...data, password: hashed });
  const saved = await doctor.save();
  logger.info({ doctorId: saved._id }, "Doctor registrado exitosamente");
  return saved;
};

export const login = async ({ email, password }: any) => {
  logger.info({ email }, "Intento de inicio de sesión");
  const doctor = await DoctorModel.findOne({ email });
  if (!doctor) {
    logger.warn(
      { email },
      "Intento de inicio de sesión con email no encontrado"
    );
    throw new Error("Credenciales inválidas");
  }

  const isValid = await bcrypt.compare(password, doctor.password);
  if (!isValid) {
    logger.warn(
      { email, doctorId: doctor._id },
      "Intento de inicio de sesión con contraseña incorrecta"
    );
    throw new Error("Credenciales inválidas");
  }

  logger.info({ doctorId: doctor._id }, "Generando token JWT");
  const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });

  logger.info({ doctorId: doctor._id }, "Inicio de sesión exitoso");
  return token;
};

export const sendOtp = async (email: string) => {
  logger.info({ email }, "Solicitando OTP para recuperación de contraseña");
  const doctor = await DoctorModel.findOne({ email });
  if (!doctor) {
    logger.warn(
      { email },
      "Intento de recuperación de contraseña con email no encontrado"
    );
    throw new Error("Correo no encontrado");
  }

  const otp = generateOtp();
  const expires = new Date(Date.now() + 10 * 60 * 1000);
  logger.info(
    { doctorId: doctor._id, otpExpires: expires },
    "OTP generado correctamente"
  );

  doctor.otp = otp;
  doctor.otpExpires = expires;
  await doctor.save();
  logger.info({ doctorId: doctor._id }, "OTP guardado en base de datos");

  try {
    await sendOtpEmail(email, doctor.nombre, otp);
    logger.info(
      { doctorId: doctor._id, email },
      "Email con OTP enviado exitosamente"
    );
  } catch (error) {
    logger.error(
      { err: error, doctorId: doctor._id, email },
      "Error al enviar email con OTP"
    );
    throw new Error("Error al enviar el correo con OTP");
  }
};

export const resetPassword = async ({ email, otp, newPassword }: any) => {
  logger.info({ email }, "Intento de restablecimiento de contraseña con OTP");
  const doctor = await DoctorModel.findOne({ email, otp });
  if (!doctor || !doctor.otpExpires || doctor.otpExpires < new Date()) {
    logger.warn(
      { email, otp },
      "OTP inválido o expirado para reset de contraseña"
    );
    throw new Error("OTP inválido o expirado");
  }

  logger.info(
    { doctorId: doctor._id },
    "OTP verificado, actualizando contraseña"
  );
  doctor.password = await bcrypt.hash(newPassword, 10);
  doctor.otp = undefined;
  doctor.otpExpires = undefined;
  await doctor.save();
  logger.info({ doctorId: doctor._id }, "Contraseña actualizada exitosamente");
};

export const getProfile = async (doctorId: string) => {
  logger.info({ doctorId }, "Obteniendo perfil de doctor");
  const doctor = await DoctorModel.findById(doctorId).select("-password");
  if (!doctor) {
    logger.warn({ doctorId }, "Intento de acceso a perfil con ID inválido");
    throw new Error("No autorizado");
  }
  logger.info({ doctorId }, "Perfil de doctor obtenido exitosamente");
  return doctor;
};
