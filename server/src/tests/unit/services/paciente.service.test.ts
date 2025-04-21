import * as PacienteService from "../../../services/paciente.service";
import { PacienteModel } from "../../../models/PacienteSchema";
import { IPaciente } from "../../../interfaces/paciente.interface";

jest.mock("../../../models/PacienteSchema", () => {
  const mockSave = jest.fn();
  const mockPacienteModel: any = jest.fn().mockImplementation(() => ({
    save: mockSave,
  }));

  // Métodos estáticos
  mockPacienteModel.find = jest.fn();
  mockPacienteModel.findById = jest.fn();
  mockPacienteModel.findOne = jest.fn();
  mockPacienteModel.findByIdAndUpdate = jest.fn();
  mockPacienteModel.findByIdAndDelete = jest.fn();

  return {
    PacienteModel: mockPacienteModel,
  };
});

jest.mock("../../../utils/logger", () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
}));

describe("Paciente Service", () => {
  const mockPaciente: Partial<IPaciente> = {
    _id: "123",
    nombre: "Juan",
    apellido: "Pérez",
    correo: "juan@example.com",
    telefono: "8091234567",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAll", () => {
    it("debe retornar todos los pacientes", async () => {
      (PacienteModel.find as jest.Mock).mockResolvedValue([mockPaciente]);

      const result = await PacienteService.getAll();

      expect(PacienteModel.find).toHaveBeenCalled();
      expect(result).toEqual([mockPaciente]);
    });
  });

  describe("create", () => {
    it("debe crear un nuevo paciente", async () => {
      // Configurar el mock para el método save() del objeto creado por el constructor
      const saveMock = jest.fn().mockResolvedValue(mockPaciente);
      (PacienteModel as unknown as jest.Mock).mockImplementation(() => ({
        save: saveMock,
      }));

      const pacienteData = {
        nombre: "Juan",
        apellido: "Pérez",
        correo: "juan@example.com",
        telefono: "8091234567",
      };

      const result = await PacienteService.create(pacienteData as IPaciente);

      expect(PacienteModel).toHaveBeenCalledWith(pacienteData);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toEqual(mockPaciente);
    });
  });

  describe("getById", () => {
    it("debe retornar un paciente por ID", async () => {
      (PacienteModel.findById as jest.Mock).mockResolvedValue(mockPaciente);

      const result = await PacienteService.getById("123");

      expect(PacienteModel.findById).toHaveBeenCalledWith("123");
      expect(result).toEqual(mockPaciente);
    });

    it("debe retornar null si el paciente no existe", async () => {
      (PacienteModel.findById as jest.Mock).mockResolvedValue(null);

      const result = await PacienteService.getById("not-found");

      expect(result).toBeNull();
    });
  });

  describe("getByCorreo", () => {
    it("debe retornar un paciente por correo", async () => {
      (PacienteModel.findOne as jest.Mock).mockResolvedValue(mockPaciente);

      const result = await PacienteService.getByCorreo("juan@example.com");

      expect(PacienteModel.findOne).toHaveBeenCalledWith({
        correo: "juan@example.com",
      });
      expect(result).toEqual(mockPaciente);
    });

    it("debe retornar null si no encuentra el paciente por correo", async () => {
      (PacienteModel.findOne as jest.Mock).mockResolvedValue(null);

      const result = await PacienteService.getByCorreo("notfound@example.com");

      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("debe actualizar un paciente y retornar el actualizado", async () => {
      const updateData = { nombre: "Pedro" };
      (PacienteModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockPaciente,
        ...updateData,
      });

      const result = await PacienteService.update("123", updateData);

      expect(PacienteModel.findByIdAndUpdate).toHaveBeenCalledWith(
        "123",
        updateData,
        { new: true }
      );
      expect(result?.nombre).toBe("Pedro");
    });

    it("debe retornar null si no encuentra el paciente para actualizar", async () => {
      (PacienteModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      const result = await PacienteService.update("not-found", {
        nombre: "Pedro",
      });

      expect(result).toBeNull();
    });
  });

  describe("remove", () => {
    it("debe eliminar un paciente por ID", async () => {
      (PacienteModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockPaciente
      );

      await PacienteService.remove("123");

      expect(PacienteModel.findByIdAndDelete).toHaveBeenCalledWith("123");
    });

    it("no lanza error si el paciente no existe", async () => {
      (PacienteModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

      await expect(
        PacienteService.remove("no-existe")
      ).resolves.toBeUndefined();
    });
  });
});
