import { PacienteModel } from "../models/PacienteSchema";
import { Paciente } from "../interfaces/paciente.interface";

export const getAll = async (): Promise<Paciente[]> => {
  return await PacienteModel.find();
};

export const create = async (data: Paciente): Promise<Paciente> => {
  const newPatient = new PacienteModel(data);
  return await newPatient.save();
};

export const getById = async (id: string): Promise<Paciente | null> => {
  return await PacienteModel.findById(id);
};

export const update = async (
  id: string,
  data: Partial<Paciente>
): Promise<Paciente | null> => {
  return await PacienteModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string): Promise<void> => {
  await PacienteModel.findByIdAndDelete(id);
};
