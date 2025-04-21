import { Request, Response } from "express";
import * as CitaService from "../services/cita.service";
import logger from "../utils/logger";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    logger.info("Obteniendo todas las citas");
    const appointments = await CitaService.getAll();
    logger.info(`Obtenidas ${appointments.length} citas con éxito`);
    res.json(appointments);
  } catch (error) {
    logger.error({ err: error }, "Error al obtener citas");
    res.status(500).json({ message: "Error al obtener las citas." });
  }
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    logger.info({ citaData: req.body }, "Creando nueva cita");
    const newAppointment = await CitaService.create(req.body);
    logger.info({ citaId: newAppointment._id }, "Cita creada exitosamente");
    res.status(201).json(newAppointment);
  } catch (error) {
    logger.error({ err: error, citaData: req.body }, "Error al crear cita");
    res.status(500).json({ message: "Error al crear la cita." });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    logger.info({ citaId: id }, "Buscando cita por ID");
    const appointment = await CitaService.getById(id);

    if (!appointment) {
      logger.warn({ citaId: id }, "Cita no encontrada");
      return res.status(404).json({ message: "Cita no encontrada." });
    }

    logger.info({ citaId: id }, "Cita encontrada exitosamente");
    res.json(appointment);
  } catch (error) {
    logger.error({ err: error, citaId: id }, "Error al obtener cita");
    res.status(500).json({ message: "Error al obtener la cita." });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    logger.info({ citaId: id, updateData: req.body }, "Actualizando cita");
    const updated = await CitaService.update(id, req.body);

    if (!updated) {
      logger.warn({ citaId: id }, "Cita no encontrada para actualizar");
      return res
        .status(404)
        .json({ message: "Cita no encontrada para actualizar." });
    }

    logger.info({ citaId: id }, "Cita actualizada exitosamente");
    res.json(updated);
  } catch (error) {
    logger.error(
      { err: error, citaId: id, updateData: req.body },
      "Error al actualizar cita"
    );
    res.status(500).json({ message: "Error al actualizar la cita." });
  }
};

export const deleteAppointment = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    logger.info({ citaId: id }, "Intentando eliminar cita");
    const cita = await CitaService.getById(id);

    if (!cita) {
      logger.warn({ citaId: id }, "Cita no encontrada para eliminar");
      return res
        .status(404)
        .json({ message: "Cita no encontrada para eliminar." });
    }

    await CitaService.remove(id);
    logger.info({ citaId: id }, "Cita eliminada exitosamente");
    res.status(204).send();
  } catch (error) {
    logger.error({ err: error, citaId: id }, "Error al eliminar cita");
    res.status(500).json({ message: "Error al eliminar la cita." });
  }
};
