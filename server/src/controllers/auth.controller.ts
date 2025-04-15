import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { AuthRequest } from "../types/AuthRequest";
import bcrypt from "bcryptjs";


export const registerDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await AuthService.register(req.body);
    res.status(201).json(doctor);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const loginDoctor = async (req: Request, res: Response) => {
  try {
    const token = await AuthService.login(req.body);
    res.json({ token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    await AuthService.sendOtp(req.body.email);
    res.json({ message: "OTP enviado al correo electrónico." });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    await AuthService.resetPassword(req.body);
    res.json({ message: "Contraseña actualizada con éxito." });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getDoctorProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user?.id) throw new Error("No autorizado");

    const doctor = await AuthService.getProfile(req.user.id);
    res.json(doctor);
  } catch (error: any) {
    res.status(401).json({ message: "No autorizado" });
  }
};

