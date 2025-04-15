import { ICita } from "../interfaces/cita.interface";
import { CitaModel } from "../models/CitaSchema";
import { sendCancelationEmail } from "../utils/email";
import { getByCorreo, create as createPaciente } from "./paciente.service";
import { sendAppointmentEmail } from "../utils/email";
import { getById as getDoctorById } from "./doctor.service";
import logger from "../utils/logger";

export const getAll = async (): Promise<ICita[]> => {
  logger.info("Obteniendo todas las citas");
  const citas = await CitaModel.find().populate("paciente").populate("doctor");
  logger.info(`Recuperadas ${citas.length} citas con éxito`);
  return citas;
};

export const getById = async (id: string): Promise<ICita | null> => {
  logger.info({ citaId: id }, "Buscando cita por ID");
  const cita = await CitaModel.findById(id)
    .populate("paciente")
    .populate("doctor");

  if (!cita) {
    logger.warn({ citaId: id }, "Cita no encontrada");
  } else {
    logger.info({ citaId: id }, "Cita encontrada exitosamente");
  }

  return cita;
};

export const create = async (data: any): Promise<ICita> => {
  const { paciente, doctor, fecha, hora } = data;

  logger.info(
    {
      email: paciente.correo,
      doctorId: doctor,
      fecha,
      hora,
    },
    "Creando nueva cita"
  );

  logger.info({ email: paciente.correo }, "Verificando si el paciente existe");
  let pacienteExistente = await getByCorreo(paciente.correo);

  if (!pacienteExistente) {
    logger.info(
      { pacienteData: paciente },
      "Paciente no encontrado, creando nuevo paciente"
    );
    pacienteExistente = await createPaciente(paciente);
    logger.info({ pacienteId: pacienteExistente._id }, "Nuevo paciente creado");
  } else {
    logger.info(
      { pacienteId: pacienteExistente._id },
      "Usando paciente existente"
    );
  }

  logger.info(
    {
      pacienteId: pacienteExistente._id,
      doctorId: doctor,
      fecha,
      hora,
    },
    "Guardando cita en la base de datos"
  );

  const newAppointment = new CitaModel({
    fecha,
    hora,
    paciente: pacienteExistente._id,
    doctor,
  });

  const savedAppointment = await newAppointment.save();
  logger.info({ citaId: savedAppointment._id }, "Cita guardada exitosamente");

  logger.info(
    { doctorId: doctor },
    "Obteniendo información del doctor para el email"
  );
  const doctorInfo = await getDoctorById(doctor);

  if (!doctorInfo) {
    logger.warn({ doctorId: doctor }, "Información del doctor no encontrada");
  }

  try {
    logger.info(
      {
        pacienteId: pacienteExistente._id,
        email: pacienteExistente.correo,
        fecha,
        hora,
      },
      "Enviando email de confirmación de cita"
    );

    await sendAppointmentEmail(
      pacienteExistente.correo,
      pacienteExistente.nombre,
      `${doctorInfo?.nombre} ${doctorInfo?.apellido}`,
      doctorInfo?.especialidad || "General",
      new Date(fecha).toLocaleDateString("es-ES"),
      hora
    );

    logger.info(
      { email: pacienteExistente.correo },
      "Email de confirmación enviado exitosamente"
    );
  } catch (error) {
    logger.error(
      { err: error, email: pacienteExistente.correo },
      "Error al enviar email de confirmación"
    );
  }

  logger.info(
    { citaId: savedAppointment._id },
    "Obteniendo cita completa con relaciones"
  );
  const populatedAppointment = await CitaModel.findById(savedAppointment._id)
    .populate("doctor")
    .populate("paciente");

  logger.info(
    { citaId: savedAppointment._id },
    "Proceso de creación de cita completado"
  );
  return populatedAppointment as ICita;
};

export const update = async (
  id: string,
  data: Partial<ICita>
): Promise<ICita | null> => {
  logger.info({ citaId: id, updateData: data }, "Actualizando cita");

  const updated = await CitaModel.findByIdAndUpdate(id, data, { new: true });

  if (!updated) {
    logger.warn({ citaId: id }, "Cita no encontrada para actualizar");
    return null;
  }

  logger.info({ citaId: id }, "Cita actualizada exitosamente");
  return updated;
};

export const remove = async (id: string): Promise<void> => {
  logger.info({ citaId: id }, "Intentando eliminar cita");

  const cita = await CitaModel.findById(id)
    .populate("paciente")
    .populate("doctor");
  if (!cita) {
    logger.warn({ citaId: id }, "Cita no encontrada para eliminar");
    throw new Error("Cita no encontrada");
  }

  const paciente: any = cita.paciente;
  const doctor: any = cita.doctor;

  logger.info(
    {
      citaId: id,
      pacienteId: paciente._id,
      doctorId: doctor._id,
    },
    "Enviando email de cancelación"
  );

  try {
    await sendCancelationEmail(
      paciente.correo,
      paciente.nombre,
      `${doctor.nombre} ${doctor.apellido}`,
      new Date(cita.fecha).toLocaleDateString("es-ES"),
      cita.hora
    );
    logger.info(
      { email: paciente.correo },
      "Email de cancelación enviado exitosamente"
    );
  } catch (error) {
    logger.error(
      { err: error, email: paciente.correo },
      "Error al enviar email de cancelación"
    );
  }

  await CitaModel.findByIdAndDelete(id);
  logger.info(
    { citaId: id },
    "Cita eliminada exitosamente de la base de datos"
  );
};
