import { DoctorModel } from '../models/DoctorSchema';
import { IDoctor } from '../interfaces/doctor.interface';

export const getAll = async (): Promise<IDoctor[]> => {
  return await DoctorModel.find();
};

export const create = async (data: IDoctor): Promise<IDoctor> => {
  const newDoctor = new DoctorModel(data);
  return await newDoctor.save();
};

export const getById = async (id: string): Promise<IDoctor | null> => {
  return await DoctorModel.findById(id);
};

export const update = async (id: string, data: Partial<IDoctor>): Promise<IDoctor | null> => {
  return await DoctorModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string): Promise<void> => {
  await DoctorModel.findByIdAndDelete(id);
};
