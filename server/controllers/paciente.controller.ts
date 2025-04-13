import { Request, Response } from "express";
import * as pacienteService from "../services/paciente.service";

export const getAllPatients = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await pacienteService.getAll();
    res.json(patients);
  } catch (error) {
    console.error("❌ Error al obtener pacientes:", error);
    res.status(500).json({ message: "Error al obtener la lista de pacientes." });
  }
};

export const createPatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const newPatient = await pacienteService.create(req.body);
    res.status(201).json(newPatient);
  } catch (error: any) {
    console.error("❌ Error al crear paciente:", error);

    if (error.code === 11000) {
      res.status(400).json({ message: "El correo ya está registrado." });
      return;
    }

    res.status(500).json({ message: "Error al crear el paciente." });
  }
};

export const getPatientById = async (req: Request, res: Response): Promise<void> => {
  try {
    const patient = await pacienteService.getById(req.params.id);

    if (!patient) {
      res.status(404).json({ message: "Paciente no encontrado." });
      return;
    }

    res.json(patient);
  } catch (error) {
    console.error("❌ Error al obtener paciente:", error);
    res.status(500).json({ message: "Error al obtener el paciente." });
  }
};

export const updatePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await pacienteService.update(req.params.id, req.body);

    if (!updated) {
      res.status(404).json({ message: "Paciente no encontrado para actualizar." });
      return;
    }

    res.json(updated);
  } catch (error: any) {
    console.error("❌ Error al actualizar paciente:", error);

    if (error.code === 11000) {
      res.status(400).json({ message: "El correo ya está en uso por otro paciente." });
      return;
    }

    res.status(500).json({ message: "Error al actualizar el paciente." });
  }
};

export const deletePatient = async (req: Request, res: Response): Promise<void> => {
  try {
    const paciente = await pacienteService.getById(req.params.id);

    if (!paciente) {
      res.status(404).json({ message: "Paciente no encontrado para eliminar." });
      return;
    }

    await pacienteService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error al eliminar paciente:", error);
    res.status(500).json({ message: "Error al eliminar el paciente." });
  }
};
