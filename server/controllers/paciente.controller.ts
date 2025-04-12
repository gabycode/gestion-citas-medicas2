import { Request, Response } from "express";
import * as pacienteService from "../services/paciente.service";

export const getAllPatients = async (req: Request, res: Response) => {
  const patients = await pacienteService.getAll();
  res.json(patients);
};

export const createPatient = async (req: Request, res: Response) => {
  const newPatient = await pacienteService.create(req.body);
  res.status(201).json(newPatient);
};

export const getPatientById = async (req: Request, res: Response) => {
  const patient = await pacienteService.getById(req.params.id);
  res.json(patient);
};

export const updatePatient = async (req: Request, res: Response) => {
  const updated = await pacienteService.update(req.params.id, req.body);
  res.json(updated);
};

export const deletePatient = async (req: Request, res: Response) => {
  await pacienteService.remove(req.params.id);
  res.status(204).send();
};
