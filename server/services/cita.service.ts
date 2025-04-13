import { ICita } from "../interfaces/cita.interface";
import { CitaModel } from "../models/CitaSchema";
import { DoctorModel } from "../models/DoctorSchema";
import { PacienteModel } from "../models/PacienteSchema";
import { getByCorreo, create as createPaciente } from "./paciente.service";
import { sendAppointmentEmail } from "../utils/email";
import { getById as getDoctorById } from "./doctor.service";

export const getAll = async (): Promise<ICita[]> => {
  return await CitaModel.find().populate("paciente").populate("doctor");
};

export const getById = async (id: string): Promise<ICita | null> => {
  return await CitaModel.findById(id).populate("paciente").populate("doctor");
};

export const create = async (data: any): Promise<ICita> => {
  const { paciente, doctor, fecha, hora } = data;

  let pacienteExistente = await getByCorreo(paciente.correo);

  if (!pacienteExistente) {
    pacienteExistente = await createPaciente(paciente);
  }

  const newAppointment = new CitaModel({
    fecha,
    hora,
    paciente: pacienteExistente._id,
    doctor,
  });

  const savedAppointment = await newAppointment.save();

  // 📧 Enviar email
  const doctorInfo = await getDoctorById(doctor);

  await sendAppointmentEmail(
    pacienteExistente.correo,
    pacienteExistente.nombre,
    `${doctorInfo?.nombre} ${doctorInfo?.apellido}`,
    doctorInfo?.especialidad || "General",
    new Date(fecha).toLocaleDateString("es-ES"),
    hora
  );

  // ✅ Retornamos la cita populada
  const populatedAppointment = await CitaModel.findById(savedAppointment._id)
    .populate("doctor")
    .populate("paciente");

  return populatedAppointment as ICita;
};


export const update = async (
  id: string,
  data: Partial<ICita>
): Promise<ICita | null> => {
  return await CitaModel.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id: string): Promise<void> => {
  await CitaModel.findByIdAndDelete(id);
};
