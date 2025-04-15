// tests/unit/models/doctorSchema.test.ts
import mongoose from "mongoose";
import { DoctorModel } from "../../../models/DoctorSchema";

describe("DoctorSchema", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("debería crear un doctor válido correctamente", () => {
    const doctor = new DoctorModel({
      nombre: "Laura",
      apellido: "González",
      especialidad: "Cardiología",
      telefono: "8091234567",
      email: "laura@example.com",
      password: "securepassword123",
    });

    const validationError = doctor.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("debería lanzar error si falta un campo requerido", () => {
    const doctor = new DoctorModel({
      nombre: "Carlos",
      email: "carlos@example.com",
    });

    const validationError = doctor.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError?.errors).toHaveProperty("apellido");
    expect(validationError?.errors).toHaveProperty("especialidad");
    expect(validationError?.errors).toHaveProperty("telefono");
    expect(validationError?.errors).toHaveProperty("password");
  });

  it("debería permitir campos opcionales como otp y otpExpires", () => {
    const doctor = new DoctorModel({
      nombre: "Ana",
      apellido: "Martínez",
      especialidad: "Dermatología",
      telefono: "8291234567",
      email: "ana@example.com",
      password: "anotherpass",
      otp: "123456",
      otpExpires: new Date(Date.now() + 60000),
    });

    const validationError = doctor.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("debería tener el email como único", () => {
    const schemaPaths = DoctorModel.schema.paths;
    expect(schemaPaths.email.options.unique).toBe(true);
  });
});
