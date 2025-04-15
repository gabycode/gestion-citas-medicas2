import request from "supertest";
import express from "express";
import pacienteRoutes from "../../../routes/paciente.route";

// Mock de pacienteService
jest.mock("../../../services/paciente.service");
import * as pacienteService from "../../../services/paciente.service";

// Crear un servidor Express para testing
const app = express();
app.use(express.json());
app.use("/api/pacientes", pacienteRoutes);

describe("PacienteController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería obtener todos los pacientes", async () => {
    const mockPatients = [
      {
        _id: "1",
        nombre: "Juan Pérez",
        correo: "juan@example.com",
      },
      {
        _id: "2",
        nombre: "Ana López",
        correo: "ana@example.com",
      },
    ];

    (pacienteService.getAll as jest.Mock).mockResolvedValue(mockPatients);

    const response = await request(app).get("/api/pacientes");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: "1" }),
        expect.objectContaining({ _id: "2" }),
      ])
    );
    expect(pacienteService.getAll).toHaveBeenCalledTimes(1);
  });

  it("debería crear un nuevo paciente", async () => {
    const newPatient = {
      nombre: "Pedro Gómez",
      correo: "pedro@example.com",
      password: "password123",
    };

    const createdPatient = {
      ...newPatient,
      _id: "1",
    };

    (pacienteService.create as jest.Mock).mockResolvedValue(createdPatient);

    const response = await request(app).post("/api/pacientes").send(newPatient);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id", "1");
    expect(pacienteService.create).toHaveBeenCalledTimes(1);
    expect(pacienteService.create).toHaveBeenCalledWith(
      expect.objectContaining(newPatient)
    );
  });

  it("debería devolver 404 si no se encuentra el paciente por ID", async () => {
    const patientId = "nonexistent-id";

    (pacienteService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/pacientes/${patientId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Paciente no encontrado.");
    expect(pacienteService.getById).toHaveBeenCalledTimes(1);
  });

  it("debería actualizar un paciente existente", async () => {
    const patientId = "1";
    const updateData = { correo: "pedro123@example.com" };

    const updatedPatient = { ...updateData, _id: patientId };

    (pacienteService.update as jest.Mock).mockResolvedValue(updatedPatient);

    const response = await request(app)
      .put(`/api/pacientes/${patientId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedPatient));
    expect(pacienteService.update).toHaveBeenCalledTimes(1);
    expect(pacienteService.update).toHaveBeenCalledWith(patientId, updateData);
  });

  it("debería devolver 404 si no se encuentra el paciente para actualizar", async () => {
    const patientId = "nonexistent-id";
    const updateData = { correo: "nuevocorreo@example.com" };

    (pacienteService.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put(`/api/pacientes/${patientId}`)
      .send(updateData);

    expect(response.status).toBe(404);
    expect(pacienteService.update).toHaveBeenCalledTimes(1);
  });

  it("debería devolver 404 si no se encuentra el paciente para eliminar", async () => {
    const patientId = "nonexistent-id";

    (pacienteService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete(`/api/pacientes/${patientId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Paciente no encontrado para eliminar."
    );
    expect(pacienteService.getById).toHaveBeenCalledTimes(1);
  });

  it("debería eliminar un paciente correctamente", async () => {
    const patientId = "1";

    (pacienteService.getById as jest.Mock).mockResolvedValue({
      _id: patientId,
    });
    (pacienteService.remove as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete(`/api/pacientes/${patientId}`);

    expect(response.status).toBe(204);
    expect(pacienteService.getById).toHaveBeenCalledTimes(1);
    expect(pacienteService.remove).toHaveBeenCalledWith(patientId);
    expect(pacienteService.remove).toHaveBeenCalledTimes(1);
  });
});
