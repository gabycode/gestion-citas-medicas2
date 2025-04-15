import request from "supertest";
import express from "express";
import citaRoutes from "../../../routes/cita.route";

jest.mock("../../../services/cita.service");
import * as CitaService from "../../../services/cita.service";

const app = express();
app.use(express.json());
app.use("/api/citas", citaRoutes);

describe("CitaController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería obtener todas las citas", async () => {
    const mockAppointments = [
      {
        _id: "1",
        fecha: new Date().toISOString().split("T")[0], // Para que sea serializable
        hora: "10:00",
        paciente: "1",
        doctor: "2",
      },
      {
        _id: "2",
        fecha: new Date().toISOString().split("T")[0],
        hora: "12:00",
        paciente: "3",
        doctor: "4",
      },
    ];

    (CitaService.getAll as jest.Mock).mockResolvedValue(mockAppointments);

    const response = await request(app).get("/api/citas");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: "1" }),
        expect.objectContaining({ _id: "2" }),
      ])
    );
    expect(CitaService.getAll).toHaveBeenCalledTimes(1);
  });

  it("debería crear una nueva cita", async () => {
    const newAppointment = {
      fecha: "2023-06-15", // Usar string en lugar de Date para ser serializable
      hora: "14:00",
      paciente: { correo: "paciente@example.com", nombre: "Juan" },
      doctor: "2",
    };

    const createdAppointment = {
      ...newAppointment,
      _id: "1",
      paciente: { _id: "pid1", correo: "paciente@example.com", nombre: "Juan" },
    };

    (CitaService.create as jest.Mock).mockResolvedValue(createdAppointment);

    const response = await request(app).post("/api/citas").send(newAppointment);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id", "1");
    expect(CitaService.create).toHaveBeenCalledTimes(1);
    expect(CitaService.create).toHaveBeenCalledWith(
      expect.objectContaining(newAppointment)
    );
  });

  it("debería devolver 404 si no se encuentra la cita por ID", async () => {
    const citaId = "nonexistent-id";

    (CitaService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/citas/${citaId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Cita no encontrada.");
    expect(CitaService.getById).toHaveBeenCalledTimes(1);
  });

  it("debería actualizar una cita existente", async () => {
    const citaId = "1";
    const updateData = { hora: "15:00" };

    const updatedAppointment = { ...updateData, _id: citaId };

    (CitaService.update as jest.Mock).mockResolvedValue(updatedAppointment);

    const response = await request(app)
      .put(`/api/citas/${citaId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedAppointment));
    expect(CitaService.update).toHaveBeenCalledTimes(1);
    expect(CitaService.update).toHaveBeenCalledWith(citaId, updateData);
  });

  it("debería devolver 404 si no se encuentra la cita para actualizar", async () => {
    const citaId = "nonexistent-id";
    const updateData = { hora: "16:00" };

    (CitaService.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put(`/api/citas/${citaId}`)
      .send(updateData);

    expect(response.status).toBe(404);
    expect(CitaService.update).toHaveBeenCalledTimes(1);
  });

  it("debería devolver 404 si no se encuentra la cita para eliminar", async () => {
    const citaId = "nonexistent-id";

    (CitaService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete(`/api/citas/${citaId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Cita no encontrada para eliminar."
    );
    expect(CitaService.getById).toHaveBeenCalledTimes(1);
  });

  it("debería eliminar una cita correctamente", async () => {
    const citaId = "1";

    (CitaService.getById as jest.Mock).mockResolvedValue({ _id: citaId });
    (CitaService.remove as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete(`/api/citas/${citaId}`);

    expect(response.status).toBe(204);
    expect(CitaService.getById).toHaveBeenCalledTimes(1);
    expect(CitaService.remove).toHaveBeenCalledWith(citaId);
    expect(CitaService.remove).toHaveBeenCalledTimes(1);
  });
});
