import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { AuthRequest } from "../types/AuthRequest";
import logger from "../utils/logger";

export const registerDoctor = async (req: Request, res: Response) => {
  try {
    logger.info(
      { doctorData: { ...req.body, password: "[REDACTED]" } },
      "Registrando nuevo doctor"
    );
    const doctor = await AuthService.register(req.body);
    logger.info({ doctorId: doctor._id }, "Doctor registrado exitosamente");
    res.status(201).json(doctor);
  } catch (error: any) {
    logger.error(
      { err: error, email: req.body.email },
      "Error al registrar doctor"
    );
    res.status(400).json({ message: error.message });
  }
};

export const loginDoctor = async (req: Request, res: Response) => {
  try {
    logger.info({ email: req.body.email }, "Intento de inicio de sesión");
    const token = await AuthService.login(req.body);
    logger.info({ email: req.body.email }, "Inicio de sesión exitoso");
    res.json({ token });
  } catch (error: any) {
    logger.warn(
      { email: req.body.email, err: error.message },
      "Intento de inicio de sesión fallido"
    );
    res.status(401).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    logger.info({ email }, "Solicitud de recuperación de contraseña");
    await AuthService.sendOtp(email);
    logger.info({ email }, "OTP enviado exitosamente");
    res.json({ message: "OTP enviado al correo electrónico." });
  } catch (error: any) {
    logger.error({ err: error, email: req.body.email }, "Error al enviar OTP");
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    logger.info(
      { email: req.body.email },
      "Intento de restablecimiento de contraseña"
    );
    await AuthService.resetPassword(req.body);
    logger.info(
      { email: req.body.email },
      "Contraseña restablecida exitosamente"
    );
    res.json({ message: "Contraseña actualizada con éxito." });
  } catch (error: any) {
    logger.error(
      { err: error, email: req.body.email },
      "Error al restablecer contraseña"
    );
    res.status(400).json({ message: error.message });
  }
};

export const getDoctorProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      logger.warn("Intento de acceso a perfil sin ID de usuario");
      throw new Error("No autorizado");
    }

    logger.info({ doctorId: req.user.id }, "Obteniendo perfil de doctor");
    const doctor = await AuthService.getProfile(req.user.id);
    logger.info(
      { doctorId: req.user.id },
      "Perfil de doctor obtenido con éxito"
    );
    res.json(doctor);
  } catch (error: any) {
    logger.error(
      { err: error, userId: req.user?.id },
      "Error al obtener perfil de doctor"
    );
    res.status(401).json({ message: "No autorizado" });
  }
};
