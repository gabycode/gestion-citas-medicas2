import * as CitaService from "../../../services/cita.service";
import { CitaModel } from "../../../models/CitaSchema";
import { sendAppointmentEmail, sendCancelationEmail } from "../../../utils/email";
import * as PacienteService from "../../../services/paciente.service";
import * as DoctorService from "../../../services/doctor.service";
import logger from "../../../utils/logger";

jest.mock("../../../models/CitaSchema", () => {
  const mockSave = jest.fn();
  const mockCitaModel: any = jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));
  mockCitaModel.find = jest
    .fn()
    .mockReturnValue({ populate: jest.fn().mockReturnThis() });
  mockCitaModel.findById = jest
    .fn()
    .mockReturnValue({ populate: jest.fn().mockReturnThis() });
  mockCitaModel.findByIdAndUpdate = jest.fn();
  mockCitaModel.findByIdAndDelete = jest.fn();
  return {
    CitaModel: mockCitaModel,
  };
});

jest.mock("../../../services/paciente.service");
jest.mock("../../../services/doctor.service");
jest.mock("../../../utils/email");
jest.mock("../../../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
}));

describe("Cita Service", () => {
  const mockCita = {
    _id: "cita123",
    fecha: "2025-04-15",
    hora: "10:00",
    paciente: { _id: "pac123", nombre: "Juan", correo: "juan@test.com" },
    doctor: {
      _id: "doc123",
      nombre: "Dra. Ana",
      apellido: "Gómez",
      especialidad: "Cardiología",
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("debe retornar todas las citas", async () => {
      (CitaModel.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce([mockCita]),
        }),
      });

      const result = await CitaService.getAll();
      expect(CitaModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockCita]);
    });
  });

  describe("getById", () => {
    it("debe retornar una cita por ID", async () => {
      (CitaModel.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce(mockCita),
        }),
      });

      const result = await CitaService.getById("cita123");
      expect(result).toEqual(mockCita);
    });
  });

  describe("create", () => {
    it("debe crear una nueva cita y enviar email", async () => {
      const mockPaciente = {
        _id: "pac123",
        nombre: "Juan",
        correo: "juan@test.com",
      };
      const mockDoctor = {
        nombre: "Dra. Ana",
        apellido: "Gómez",
        especialidad: "Cardiología",
      };

      (PacienteService.getByCorreo as jest.Mock).mockResolvedValue(null);
      (PacienteService.create as jest.Mock).mockResolvedValue(mockPaciente);
      (DoctorService.getById as jest.Mock).mockResolvedValue(mockDoctor);

      const saveMock = jest.fn().mockResolvedValue({ _id: "cita123" });
      (CitaModel as unknown as jest.Mock).mockImplementation(() => ({
        save: saveMock,
      }));

      (CitaModel.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce(mockCita),
        }),
      });

      const result = await CitaService.create({
        paciente: mockPaciente,
        doctor: "doc123",
        fecha: "2025-04-15",
        hora: "10:00",
      });

      expect(saveMock).toHaveBeenCalled();
      expect(sendAppointmentEmail).toHaveBeenCalled();
      expect(result).toEqual(mockCita);
    });
  });

  describe("update", () => {
    it("debe actualizar y retornar la cita", async () => {
      const updatedCita = { ...mockCita, hora: "11:00" };
      (CitaModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedCita);

      const result = await CitaService.update("cita123", { hora: "11:00" });

      expect(CitaModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "cita123",
        { hora: "11:00" },
        { new: true }
      );
      expect(result).toEqual(updatedCita);
    });
  });

  describe("remove", () => {
    it("debe eliminar una cita y enviar email de cancelación", async () => {
      (CitaModel.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce(mockCita),
        }),
      });
      (CitaModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);

      await CitaService.remove("cita123");

      expect(sendCancelationEmail).toHaveBeenCalled();
      expect(CitaModel.findByIdAndDelete).toHaveBeenCalledWith("cita123");
    });

    it("debe lanzar error si la cita no existe", async () => {
      (CitaModel.findById as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValueOnce({
          populate: jest.fn().mockResolvedValueOnce(null),
        }),
      });

      await expect(CitaService.remove("no-existe")).rejects.toThrow(
        "Cita no encontrada"
      );
    });
  });
});
