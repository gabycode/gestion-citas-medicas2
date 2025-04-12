import { Request, Response } from 'express';
import * as DoctorService from '../services/doctor.service';

export const getAllDoctors = async (req: Request, res: Response) => {
  const doctors = await DoctorService.getAll();
  res.json(doctors);
};

export const createDoctor = async (req: Request, res: Response) => {
  const newDoctor = await DoctorService.create(req.body);
  res.status(201).json(newDoctor);
};

export const getDoctorById = async (req: Request, res: Response) => {
  const doctor = await DoctorService.getById(req.params.id);
  res.json(doctor);
};

export const updateDoctor = async (req: Request, res: Response) => {
  const updated = await DoctorService.update(req.params.id, req.body);
  res.json(updated);
};

export const deleteDoctor = async (req: Request, res: Response) => {
  await DoctorService.remove(req.params.id);
  res.status(204).send();
};
