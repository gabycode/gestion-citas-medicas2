// tests/unit/models/pacienteSchema.test.ts
import mongoose from "mongoose";
import { PacienteModel } from "../../../models/PacienteSchema";

describe("PacienteSchema", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("debería crear un paciente válido correctamente", () => {
    const paciente = new PacienteModel({
      nombre: "Luis",
      apellido: "Ramírez",
      telefono: "8099876543",
      correo: "luis@example.com",
    });

    const validationError = paciente.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("debería lanzar error si falta un campo requerido", () => {
    const paciente = new PacienteModel({
      nombre: "Laura",
      telefono: "8297654321",
    });

    const validationError = paciente.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError?.errors).toHaveProperty("apellido");
    expect(validationError?.errors).toHaveProperty("correo");
  });

  it("debería tener el correo como único", () => {
    const schemaPaths = PacienteModel.schema.paths;
    expect(schemaPaths.correo.options.unique).toBe(true);
  });
});
