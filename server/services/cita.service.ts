import { CitaModel } from "../models/CitaSchema";
import { Cita } from "../interfaces/cita.interface";

export const getAll = async (): Promise<Cita[]> => {
  return await CitaModel.find();
};

export const create = async (data: Cita): Promise<Cita> => {
  const newAppointment = new CitaModel(data);
  return await newAppointment.save();
};

export const getById = async (id: string): Promise<Cita | null> => {
  return await CitaModel.findById(id);
};

export const update = async (
  id: string,
  data: Partial<Cita>
): Promise<Cita | null> => {
  return await CitaModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string): Promise<void> => {
  await CitaModel.findByIdAndDelete(id);
};
