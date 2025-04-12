import { Request, Response } from "express";
import * as CitaService from "../services/cita.service";

export const getAllAppointments = async (req: Request, res: Response) => {
  const appointments = await CitaService.getAll();
  res.json(appointments);
};

export const createAppointment = async (req: Request, res: Response) => {
  const newAppointment = await CitaService.create(req.body);
  res.status(201).json(newAppointment);
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const appointment = await CitaService.getById(req.params.id);
  res.json(appointment);
};

export const updateAppointment = async (req: Request, res: Response) => {
  const updated = await CitaService.update(req.params.id, req.body);
  res.json(updated);
};

export const deleteAppointment = async (req: Request, res: Response) => {
  await CitaService.remove(req.params.id);
  res.status(204).send();
};
