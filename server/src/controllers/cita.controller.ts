import { Request, Response } from "express";
import * as CitaService from "../services/cita.service";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await CitaService.getAll();
    res.json(appointments);
  } catch (error) {
    console.error("❌ Error al obtener citas:", error);
    res.status(500).json({ message: "Error al obtener las citas." });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const newAppointment = await CitaService.create(req.body);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("❌ Error al crear cita:", error);
    res.status(500).json({ message: "Error al crear la cita." });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await CitaService.getById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Cita no encontrada." });
    }

    res.json(appointment);
  } catch (error) {
    console.error("❌ Error al obtener cita:", error);
    res.status(500).json({ message: "Error al obtener la cita." });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const updated = await CitaService.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Cita no encontrada para actualizar." });
    }

    res.json(updated);
  } catch (error) {
    console.error("❌ Error al actualizar cita:", error);
    res.status(500).json({ message: "Error al actualizar la cita." });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const cita = await CitaService.getById(req.params.id);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada para eliminar." });
    }

    await CitaService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error al eliminar cita:", error);
    res.status(500).json({ message: "Error al eliminar la cita." });
  }
};
