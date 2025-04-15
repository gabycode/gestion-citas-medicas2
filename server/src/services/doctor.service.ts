import { DoctorModel } from "../models/DoctorSchema";
import { IDoctor } from "../interfaces/doctor.interface";
import logger from "../utils/logger";

export const getAll = async (): Promise<IDoctor[]> => {
  logger.info("Obteniendo todos los doctores");

  const doctors = await DoctorModel.find();

  logger.info(`Se encontraron ${doctors.length} doctores`);
  return doctors;
};

export const create = async (data: IDoctor): Promise<IDoctor> => {
  logger.info({ data }, "Creando nuevo doctor");

  const newDoctor = new DoctorModel(data);
  const savedDoctor = await newDoctor.save();

  logger.info({ doctorId: savedDoctor._id }, "Doctor creado exitosamente");
  return savedDoctor;
};

export const getById = async (id: string): Promise<IDoctor | null> => {
  logger.info({ doctorId: id }, "Buscando doctor por ID");

  const doctor = await DoctorModel.findById(id);

  if (!doctor) {
    logger.warn({ doctorId: id }, "Doctor no encontrado");
  } else {
    logger.info({ doctorId: id }, "Doctor encontrado exitosamente");
  }

  return doctor;
};

export const update = async (
  id: string,
  data: Partial<IDoctor>
): Promise<IDoctor | null> => {
  logger.info({ doctorId: id, updateData: data }, "Actualizando doctor");

  const updated = await DoctorModel.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    logger.warn({ doctorId: id }, "Doctor no encontrado para actualizar");
    return null;
  }

  logger.info({ doctorId: id }, "Doctor actualizado exitosamente");
  return updated;
};

export const remove = async (id: string): Promise<void> => {
  logger.info({ doctorId: id }, "Intentando eliminar doctor");

  const result = await DoctorModel.findByIdAndDelete(id);

  if (!result) {
    logger.warn({ doctorId: id }, "Doctor no encontrado para eliminar");
  } else {
    logger.info({ doctorId: id }, "Doctor eliminado exitosamente");
  }
};
