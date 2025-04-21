import { Request, Response } from "express";
import * as DoctorService from "../services/doctor.service";
import { CitaModel } from "../models/CitaSchema";
import { AuthRequest } from "../types/AuthRequest";
import logger from "../utils/logger";

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    logger.info("Obteniendo lista de doctores");
    const doctors = await DoctorService.getAll();
    logger.info(`Obtenidos ${doctors.length} doctores con éxito`);
    res.json(doctors);
  } catch (error) {
    logger.error({ err: error }, "Error al obtener doctores");
    res.status(500).json({ message: "Error al obtener la lista de doctores." });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    logger.info(
      {
        doctorData: {
          ...req.body,
          password: req.body.password ? "[REDACTED]" : undefined,
        },
      },
      "Creando nuevo doctor"
    );
    const newDoctor = await DoctorService.create(req.body);
    logger.info({ doctorId: newDoctor._id }, "Doctor creado exitosamente");
    res.status(201).json(newDoctor);
  } catch (error: any) {
    if (error.code === 11000) {
      logger.warn(
        { email: req.body.email },
        "Intento de crear doctor con email duplicado"
      );
      return res.status(400).json({ message: "El email ya está en uso." });
    }

    logger.error({ err: error }, "Error al crear doctor");
    res.status(500).json({ message: "Error al crear el doctor." });
  }
};

export const getCitasDoctor = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user?.id;
    if (!doctorId) {
      logger.warn("Intento de acceso a citas sin ID de doctor");
      return res.status(401).json({ message: "No autorizado" });
    }

    logger.info({ doctorId }, "Obteniendo citas del doctor");
    const citas = await CitaModel.find({ doctor: doctorId })
      .populate("paciente", "nombre apellido correo telefono")
      .sort({ fecha: 1 });

    logger.info(
      { doctorId, citasCount: citas.length },
      "Citas del doctor obtenidas con éxito"
    );
    res.json(citas);
  } catch (error) {
    logger.error(
      { err: error, doctorId: req.user?.id },
      "Error al obtener citas del doctor"
    );
    res.status(500).json({ message: "Error al obtener citas del doctor" });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    logger.info({ doctorId: id }, "Buscando doctor por ID");
    const doctor = await DoctorService.getById(id);

    if (!doctor) {
      logger.warn({ doctorId: id }, "Doctor no encontrado");
      return res.status(404).json({ message: "Doctor no encontrado." });
    }

    logger.info({ doctorId: id }, "Doctor encontrado exitosamente");
    res.json(doctor);
  } catch (error) {
    logger.error({ err: error, doctorId: id }, "Error al obtener doctor");
    res.status(500).json({ message: "Error al obtener el doctor." });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    logger.info(
      {
        doctorId: id,
        updateData: {
          ...req.body,
          password: req.body.password ? "[REDACTED]" : undefined,
        },
      },
      "Actualizando doctor"
    );

    const updated = await DoctorService.update(id, req.body);

    if (!updated) {
      logger.warn({ doctorId: id }, "Doctor no encontrado para actualizar");
      return res
        .status(404)
        .json({ message: "Doctor no encontrado para actualizar." });
    }

    logger.info({ doctorId: id }, "Doctor actualizado exitosamente");
    res.json(updated);
  } catch (error: any) {
    if (error.code === 11000) {
      logger.warn(
        { doctorId: id, email: req.body.email },
        "Conflicto de email al actualizar doctor"
      );
      return res
        .status(400)
        .json({ message: "El email ya está en uso por otro doctor." });
    }

    logger.error({ err: error, doctorId: id }, "Error al actualizar doctor");
    res.status(500).json({ message: "Error al actualizar el doctor." });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    logger.info({ doctorId: id }, "Intentando eliminar doctor");
    const doctor = await DoctorService.getById(id);

    if (!doctor) {
      logger.warn({ doctorId: id }, "Doctor no encontrado para eliminar");
      return res
        .status(404)
        .json({ message: "Doctor no encontrado para eliminar." });
    }

    await DoctorService.remove(id);
    logger.info({ doctorId: id }, "Doctor eliminado exitosamente");
    res.status(204).send();
  } catch (error) {
    logger.error({ err: error, doctorId: id }, "Error al eliminar doctor");
    res.status(500).json({ message: "Error al eliminar el doctor." });
  }
};
