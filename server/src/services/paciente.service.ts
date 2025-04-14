import { PacienteModel } from "../models/PacienteSchema";
import { IPaciente } from "../interfaces/paciente.interface";
import logger from "../utils/logger";

export const getAll = async (): Promise<IPaciente[]> => {
  logger.info("Obteniendo todos los pacientes");

  const pacientes = await PacienteModel.find();

  logger.info(`Se encontraron ${pacientes.length} pacientes`);
  return pacientes;
};

export const create = async (data: IPaciente): Promise<IPaciente> => {
  logger.info({ data }, "Creando nuevo paciente");

  const newPatient = new PacienteModel(data);
  const savedPatient = await newPatient.save();

  logger.info({ pacienteId: savedPatient._id }, "Paciente creado exitosamente");
  return savedPatient;
};

export const getById = async (id: string): Promise<IPaciente | null> => {
  logger.info({ pacienteId: id }, "Buscando paciente por ID");

  const paciente = await PacienteModel.findById(id);

  if (!paciente) {
    logger.warn({ pacienteId: id }, "Paciente no encontrado");
  } else {
    logger.info({ pacienteId: id }, "Paciente encontrado exitosamente");
  }

  return paciente;
};

export const getByCorreo = async (
  correo: string
): Promise<IPaciente | null> => {
  logger.info({ correo }, "Buscando paciente por correo");

  const paciente = await PacienteModel.findOne({ correo });

  if (!paciente) {
    logger.warn({ correo }, "Paciente no encontrado con ese correo");
  } else {
    logger.info({ pacienteId: paciente._id }, "Paciente encontrado por correo");
  }

  return paciente;
};

export const update = async (
  id: string,
  data: Partial<IPaciente>
): Promise<IPaciente | null> => {
  logger.info({ pacienteId: id, updateData: data }, "Actualizando paciente");

  const updated = await PacienteModel.findByIdAndUpdate(id, data, {
    new: true,
  });

  if (!updated) {
    logger.warn({ pacienteId: id }, "Paciente no encontrado para actualizar");
    return null;
  }

  logger.info({ pacienteId: updated._id }, "Paciente actualizado exitosamente");
  return updated;
};

export const remove = async (id: string): Promise<void> => {
  logger.info({ pacienteId: id }, "Intentando eliminar paciente");

  const result = await PacienteModel.findByIdAndDelete(id);

  if (!result) {
    logger.warn({ pacienteId: id }, "Paciente no encontrado para eliminar");
  } else {
    logger.info({ pacienteId: id }, "Paciente eliminado exitosamente");
  }
};
