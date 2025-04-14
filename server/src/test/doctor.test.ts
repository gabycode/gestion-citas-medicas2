import { DoctorModel } from '../models/DoctorSchema';
import { create, getById } from '../services/doctor.service';

describe('DoctorService', () => {
  it('crea un doctor correctamente', async () => {
    const doctorData = {
      nombre: 'Dr. Test',
      apellido: 'Mock',
      especialidad: 'Cardiología',
      telefono: '1234567890',
      email: 'test@example.com',
    };

    const doctor = await create(doctorData);
    
    // Verificaciones
    expect(doctor).toHaveProperty('_id');
    expect(doctor.email).toBe(doctorData.email);

    // Verificar que se guardó en la DB
    const foundDoctor = await getById(doctor._id.toString());
    expect(foundDoctor?.nombre).toBe('Dr. Test');
  });

  it('falla si el email ya existe', async () => {
    const doctorData = {
      nombre: 'Dr. Duplicado',
      email: 'duplicado@example.com',
      // ...otros campos requeridos
    };

    await create(doctorData);
    await expect(create(doctorData)).rejects.toThrow(); // Debe lanzar error por email duplicado
  });
});