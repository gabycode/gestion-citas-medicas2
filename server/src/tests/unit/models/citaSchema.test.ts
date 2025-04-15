// tests/unit/models/citaSchema.test.ts
import mongoose from "mongoose";
import { CitaModel } from "../../../models/CitaSchema";

describe("CitaSchema", () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("debería crear una cita válida correctamente", async () => {
    const cita = new CitaModel({
      fecha: new Date(),
      hora: "10:00 AM",
      paciente: new mongoose.Types.ObjectId(),
      doctor: new mongoose.Types.ObjectId(),
    });

    const validationError = cita.validateSync();
    expect(validationError).toBeUndefined();
  });

  it("debería lanzar error si falta un campo requerido", async () => {
    const cita = new CitaModel({
      hora: "10:00 AM",
      paciente: new mongoose.Types.ObjectId(),
    });

    const validationError = cita.validateSync();
    expect(validationError).toBeDefined();
    expect(validationError?.errors).toHaveProperty("fecha");
    expect(validationError?.errors).toHaveProperty("doctor");
  });

  it("debería tener referencias a Paciente y Doctor", () => {
    const schemaPaths = CitaModel.schema.paths;
    expect(schemaPaths.paciente.options.ref).toBe("Paciente");
    expect(schemaPaths.doctor.options.ref).toBe("Doctor");
  });
});
