import { DoctorModel } from '../models/DoctorSchema';
import { Doctor } from '../interfaces/doctor.interface';

export const getAll = async (): Promise<Doctor[]> => {
  return await DoctorModel.find();
};

export const create = async (data: Doctor): Promise<Doctor> => {
  const newDoctor = new DoctorModel(data);
  return await newDoctor.save();
};

export const getById = async (id: string): Promise<Doctor | null> => {
  return await DoctorModel.findById(id);
};

export const update = async (id: string, data: Partial<Doctor>): Promise<Doctor | null> => {
  return await DoctorModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string): Promise<void> => {
  await DoctorModel.findByIdAndDelete(id);
};
