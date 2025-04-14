import { DoctorModel } from "../models/DoctorSchema";
import bcrypt from "bcryptjs";
import logger from "../utils/logger";

const doctores = [
  {
    nombre: "Dra. Ana",
    apellido: "Ramírez",
    especialidad: "Pediatría",
    telefono: "8091234567",
    email: "ana.ramirez@example.com",
  },
  {
    nombre: "Dr. Luis",
    apellido: "Fernández",
    especialidad: "Cardiología",
    telefono: "8299876543",
    email: "luis.fernandez@example.com",
  },
  {
    nombre: "Dra. Marta",
    apellido: "López",
    especialidad: "Dermatología",
    telefono: "8494567890",
    email: "marta.lopez@example.com",
  },
  {
    nombre: "Dr. Pedro",
    apellido: "Guzmán",
    especialidad: "Neurología",
    telefono: "8491122334",
    email: "pedro.guzman@example.com",
  },
  {
    nombre: "Dra. Carla",
    apellido: "Sánchez",
    especialidad: "Ginecología",
    telefono: "8099988776",
    email: "carla.sanchez@example.com",
  },
  {
    nombre: "Dr. Jorge",
    apellido: "Torres",
    especialidad: "Ortopedia",
    telefono: "8292233445",
    email: "jorge.torres@example.com",
  },
  {
    nombre: "Dra. Elena",
    apellido: "Martínez",
    especialidad: "Endocrinología",
    telefono: "8095566778",
    email: "elena.martinez@example.com",
  },
  {
    nombre: "Dr. Andrés",
    apellido: "Núñez",
    especialidad: "Urología",
    telefono: "8496677889",
    email: "andres.nunez@example.com",
  },
  {
    nombre: "Dra. Patricia",
    apellido: "García",
    especialidad: "Psiquiatría",
    telefono: "8294433221",
    email: "patricia.garcia@example.com",
  },
  {
    nombre: "Dr. Víctor",
    apellido: "Paredes",
    especialidad: "Gastroenterología",
    telefono: "8093344556",
    email: "victor.paredes@example.com",
  },
];

export const seedDoctores = async () => {
  try {
    const count = await DoctorModel.countDocuments();
    if (count === 0) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      const doctoresConPassword = doctores.map((doc) => ({
        ...doc,
        password: hashedPassword,
      }));

      await DoctorModel.insertMany(doctoresConPassword);
      logger.info("✅ Doctores insertados con contraseña por defecto: 123456");
    } else {
      logger.info("ℹ️ Ya existen doctores, seed no aplicado.");
    }
  } catch (error) {
    logger.error("❌ Error al ejecutar el seed de doctores:", error);
  }
};
