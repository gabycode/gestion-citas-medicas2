import { Request, Response } from "express";
import * as pacienteService from "../services/paciente.service";
import logger from "../utils/logger";

export const getAllPatients = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    logger.info("Obteniendo lista de pacientes");
    const patients = await pacienteService.getAll();
    logger.info("Lista de pacientes obtenida con éxito");
    res.json(patients);
  } catch (error) {
    logger.error({ err: error }, "Error al obtener pacientes");
    res
      .status(500)
      .json({ message: "Error al obtener la lista de pacientes." });
  }
};

export const createPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    logger.info(
      { patientData: { ...req.body, password: "[REDACTED]" } },
      "Creando nuevo paciente"
    );
    const newPatient = await pacienteService.create(req.body);
    logger.info({ patientId: newPatient._id }, "Paciente creado exitosamente");
    res.status(201).json(newPatient);
  } catch (error: any) {
    if (error.code === 11000) {
      logger.warn(
        { email: req.body.email },
        "Intento de crear paciente con email duplicado"
      );
      res.status(400).json({ message: "El correo ya está registrado." });
      return;
    }

    logger.error({ err: error }, "Error al crear paciente");
    res.status(500).json({ message: "Error al crear el paciente." });
  }
};

export const getPatientById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    logger.info({ patientId: id }, "Buscando paciente por ID");
    const patient = await pacienteService.getById(id);

    if (!patient) {
      logger.warn({ patientId: id }, "Paciente no encontrado");
      res.status(404).json({ message: "Paciente no encontrado." });
      return;
    }

    logger.info({ patientId: id }, "Paciente encontrado");
    res.json(patient);
  } catch (error) {
    logger.error({ err: error, patientId: id }, "Error al obtener paciente");
    res.status(500).json({ message: "Error al obtener el paciente." });
  }
};

export const updatePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    logger.info(
      {
        patientId: id,
        updateData: {
          ...req.body,
          password: req.body.password ? "[REDACTED]" : undefined,
        },
      },
      "Actualizando paciente"
    );
    const updated = await pacienteService.update(id, req.body);

    if (!updated) {
      logger.warn({ patientId: id }, "Paciente no encontrado para actualizar");
      res
        .status(404)
        .json({ message: "Paciente no encontrado para actualizar." });
      return;
    }

    logger.info({ patientId: id }, "Paciente actualizado exitosamente");
    res.json(updated);
  } catch (error: any) {
    if (error.code === 11000) {
      logger.warn(
        { patientId: id, email: req.body.email },
        "Conflicto de email al actualizar paciente"
      );
      res
        .status(400)
        .json({ message: "El correo ya está en uso por otro paciente." });
      return;
    }

    logger.error({ err: error, patientId: id }, "Error al actualizar paciente");
    res.status(500).json({ message: "Error al actualizar el paciente." });
  }
};

export const deletePatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    logger.info({ patientId: id }, "Intentando eliminar paciente");
    const paciente = await pacienteService.getById(id);

    if (!paciente) {
      logger.warn({ patientId: id }, "Paciente no encontrado para eliminar");
      res
        .status(404)
        .json({ message: "Paciente no encontrado para eliminar." });
      return;
    }

    await pacienteService.remove(id);
    logger.info({ patientId: id }, "Paciente eliminado exitosamente");
    res.status(204).send();
  } catch (error) {
    logger.error({ err: error, patientId: id }, "Error al eliminar paciente");
    res.status(500).json({ message: "Error al eliminar el paciente." });
  }
};
