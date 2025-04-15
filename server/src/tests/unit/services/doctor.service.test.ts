import * as DoctorService from "../../../../src/services/doctor.service";
import { DoctorModel } from "../../../../src/models/DoctorSchema";
import { IDoctor } from "../../../interfaces/doctor.interface";

jest.mock("../../../models/DoctorSchema", () => {
  const mockSave = jest.fn();
  const mockDoctorModel: any = jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));

  // Métodos estáticos
  mockDoctorModel.find = jest.fn();
  mockDoctorModel.findById = jest.fn();
  mockDoctorModel.findOne = jest.fn();
  mockDoctorModel.findByIdAndUpdate = jest.fn();
  mockDoctorModel.findByIdAndDelete = jest.fn();

  return {
    DoctorModel: mockDoctorModel,
  };
});

jest.mock("../../../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
}));

describe("Doctor Service", () => {
  const mockDoctor: Partial<IDoctor> = {
    _id: "abc123",
    nombre: "Dra. Ana",
    apellido: "Gómez",
    especialidad: "Pediatría",
    telefono: "8095551234",
    email: "ana@example.com",
    password: "securepassword123",
    // Add other required properties of IDoctor here
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("debe retornar todos los doctores", async () => {
      (DoctorModel.find as jest.Mock).mockResolvedValue([mockDoctor]);

      const result = await DoctorService.getAll();

      expect(DoctorModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockDoctor]);
    });
  });

  describe("create", () => {
    it("debe crear un nuevo doctor", async () => {
      const saveMock = jest.fn().mockResolvedValue(mockDoctor);
      (DoctorModel as unknown as jest.Mock).mockImplementation(() => ({
        save: saveMock,
      }));

      const result = await DoctorService.create(mockDoctor as IDoctor);

      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(mockDoctor);
    });
  });

  describe("getById", () => {
    it("debe retornar un doctor por ID", async () => {
      (DoctorModel.findById as jest.Mock).mockResolvedValue(mockDoctor);

      const result = await DoctorService.getById("abc123");

      expect(DoctorModel.findById).toHaveBeenCalledWith("abc123");
      expect(result).toEqual(mockDoctor);
    });

    it("debe retornar null si no encuentra el doctor", async () => {
      (DoctorModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await DoctorService.getById("no-existe");

      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("debe actualizar y retornar el doctor", async () => {
      const updateData = { especialidad: "Cardiología" };
      (DoctorModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockDoctor,
        ...updateData,
      });

      const result = await DoctorService.update("abc123", updateData);

      expect(DoctorModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "abc123",
        updateData,
        { new: true }
      );
      expect(result?.especialidad).toBe("Cardiología");
    });

    it("debe retornar null si no encuentra el doctor", async () => {
      (DoctorModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await DoctorService.update("no-existe", {
        nombre: "Otro",
      });

      expect(result).toBeNull();
    });
  });

  describe("remove", () => {
    it("debe eliminar un doctor", async () => {
      (DoctorModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockDoctor
      );

      await DoctorService.remove("abc123");

      expect(DoctorModel.findByIdAndDelete).toHaveBeenCalledWith("abc123");
    });

    it("no lanza error si el doctor no existe", async () => {
      (DoctorModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(DoctorService.remove("no-existe")).resolves.toBeUndefined();
    });
  });
});
