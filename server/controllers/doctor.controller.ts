import { Request, Response } from 'express';
import * as DoctorService from '../services/doctor.service';

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await DoctorService.getAll();
    res.json(doctors);
  } catch (error) {
    console.error('❌ Error al obtener doctores:', error);
    res.status(500).json({ message: 'Error al obtener la lista de doctores.' });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const newDoctor = await DoctorService.create(req.body);
    res.status(201).json(newDoctor);
  } catch (error: any) {
    console.error('❌ Error al crear doctor:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'El email ya está en uso.' });
    }

    res.status(500).json({ message: 'Error al crear el doctor.' });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorService.getById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado.' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('❌ Error al obtener doctor:', error);
    res.status(500).json({ message: 'Error al obtener el doctor.' });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const updated = await DoctorService.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Doctor no encontrado para actualizar.' });
    }

    res.json(updated);
  } catch (error: any) {
    console.error('❌ Error al actualizar doctor:', error);

    if (error.code === 11000) {
      return res.status(400).json({ message: 'El email ya está en uso por otro doctor.' });
    }

    res.status(500).json({ message: 'Error al actualizar el doctor.' });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await DoctorService.getById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado para eliminar.' });
    }

    await DoctorService.remove(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('❌ Error al eliminar doctor:', error);
    res.status(500).json({ message: 'Error al eliminar el doctor.' });
  }
};
