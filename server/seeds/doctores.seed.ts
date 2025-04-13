import { DoctorModel } from "../models/DoctorSchema";

const doctores = [
  {
    nombre: "Dra. Ana",
    apellido: "Ramírez",
    especialidad: "Pediatría",
    telefono: "8091234567",
    email: "ana.ramirez@example.com"
  },
  {
    nombre: "Dr. Luis",
    apellido: "Fernández",
    especialidad: "Cardiología",
    telefono: "8299876543",
    email: "luis.fernandez@example.com"
  },
  {
    nombre: "Dra. Marta",
    apellido: "López",
    especialidad: "Dermatología",
    telefono: "8494567890",
    email: "marta.lopez@example.com"
  }
];

export const seedDoctores = async () => {
  const count = await DoctorModel.countDocuments();
  if (count === 0) {
    await DoctorModel.insertMany(doctores);
    console.log("✅ Doctores insertados");
  } else {
    console.log("ℹ️ Ya existen doctores, seed no aplicado.");
  }
};
