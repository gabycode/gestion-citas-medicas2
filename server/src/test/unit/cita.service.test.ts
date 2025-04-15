import * as CitaService from '../../../src/services/cita.service';

jest.mock('../../../src/models/CitaSchema', () => ({
  CitaModel: {
    find: jest.fn(() => ({
      populate: jest.fn(() => ({
        populate: jest.fn().mockResolvedValue([
          {
            _id: '1',
            fecha: '2025-05-01',
            hora: '10:00',
            paciente: { nombre: 'Juan' },
            doctor: { nombre: 'Dra. Ana' },
          },
        ]),
      })),
    })),
  },
}));

describe('CitaService', () => {
  it('debería obtener todas las citas', async () => {
    const citas = await CitaService.getAll();

    expect(Array.isArray(citas)).toBe(true);
    expect(citas[0]).toHaveProperty('paciente');
    expect(citas[0]).toHaveProperty('doctor');
  });
});
