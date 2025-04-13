import { PacienteModel } from "../models/PacienteSchema";
import { IPaciente } from "../interfaces/paciente.interface";

export const getAll = async (): Promise<IPaciente[]> => {
  return await PacienteModel.find();
};

export const create = async (data: IPaciente): Promise<IPaciente> => {
  const newPatient = new PacienteModel(data);
  return await newPatient.save();
};

export const getById = async (id: string): Promise<IPaciente | null> => {
  return await PacienteModel.findById(id);
};

export const getByCorreo = async (correo: string): Promise<IPaciente | null> => {
  return await PacienteModel.findOne({ correo });
};

export const update = async (
  id: string,
  data: Partial<IPaciente>
): Promise<IPaciente | null> => {
  return await PacienteModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string): Promise<void> => {
  await PacienteModel.findByIdAndDelete(id);
};
