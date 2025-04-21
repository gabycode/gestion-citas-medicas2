import request from "supertest";
import express from "express";
import doctorRoutes from "../../../routes/doctor.route";

jest.mock("../../../services/doctor.service");
import * as DoctorService from "../../../services/doctor.service";

const app = express();
app.use(express.json());
app.use("/api/doctores", doctorRoutes);

describe("DoctorController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debería obtener todos los doctores", async () => {
    const mockDoctors = [
      {
        _id: "1",
        nombre: "Doctor Juan",
        especialidad: "Cardiología",
        email: "juan@example.com",
      },
      {
        _id: "2",
        nombre: "Doctora María",
        especialidad: "Pediatría",
        email: "maria@example.com",
      },
    ];

    (DoctorService.getAll as jest.Mock).mockResolvedValue(mockDoctors);

    const response = await request(app).get("/api/doctores");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ _id: "1" }),
        expect.objectContaining({ _id: "2" }),
      ])
    );
    expect(DoctorService.getAll).toHaveBeenCalledTimes(1);
  });

  it("debería crear un nuevo doctor", async () => {
    const newDoctor = {
      nombre: "Doctor Carlos",
      especialidad: "Dermatología",
      email: "carlos@example.com",
      password: "password123",
    };

    const createdDoctor = {
      ...newDoctor,
      _id: "1",
    };

    (DoctorService.create as jest.Mock).mockResolvedValue(createdDoctor);

    const response = await request(app).post("/api/doctores").send(newDoctor);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id", "1");
    expect(DoctorService.create).toHaveBeenCalledTimes(1);
    expect(DoctorService.create).toHaveBeenCalledWith(
      expect.objectContaining(newDoctor)
    );
  });

  it("debería devolver 404 si no se encuentra el doctor por ID", async () => {
    const doctorId = "nonexistent-id";

    (DoctorService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get(`/api/doctores/${doctorId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Doctor no encontrado.");
    expect(DoctorService.getById).toHaveBeenCalledTimes(1);
  });

  it("debería actualizar un doctor existente", async () => {
    const doctorId = "1";
    const updateData = { especialidad: "Neurología" };

    const updatedDoctor = { ...updateData, _id: doctorId };

    (DoctorService.update as jest.Mock).mockResolvedValue(updatedDoctor);

    const response = await request(app)
      .put(`/api/doctores/${doctorId}`)
      .send(updateData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(updatedDoctor));
    expect(DoctorService.update).toHaveBeenCalledTimes(1);
    expect(DoctorService.update).toHaveBeenCalledWith(doctorId, updateData);
  });

  it("debería devolver 404 si no se encuentra el doctor para actualizar", async () => {
    const doctorId = "nonexistent-id";
    const updateData = { especialidad: "Ginecología" };

    (DoctorService.update as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .put(`/api/doctores/${doctorId}`)
      .send(updateData);

    expect(response.status).toBe(404);
    expect(DoctorService.update).toHaveBeenCalledTimes(1);
  });

  it("debería devolver 404 si no se encuentra el doctor para eliminar", async () => {
    const doctorId = "nonexistent-id";

    (DoctorService.getById as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete(`/api/doctores/${doctorId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty(
      "message",
      "Doctor no encontrado para eliminar."
    );
    expect(DoctorService.getById).toHaveBeenCalledTimes(1);
  });

  it("debería eliminar un doctor correctamente", async () => {
    const doctorId = "1";

    (DoctorService.getById as jest.Mock).mockResolvedValue({ _id: doctorId });
    (DoctorService.remove as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete(`/api/doctores/${doctorId}`);

    expect(response.status).toBe(204);
    expect(DoctorService.getById).toHaveBeenCalledTimes(1);
    expect(DoctorService.remove).toHaveBeenCalledWith(doctorId);
    expect(DoctorService.remove).toHaveBeenCalledTimes(1);
  });
});
