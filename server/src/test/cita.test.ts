import request from 'supertest';
import express from 'express';
import { createAppointment } from '../controllers/cita.controller';
import * as CitaService from '../services/cita.service';

// Mock del servicio completo
jest.mock('../services/cita.service');

const app = express();
app.use(express.json());
app.post('/api/citas', createAppointment);

describe('CitaController', () => {
  it('retorna 201 al crear cita', async () => {
    const mockCita = {
      _id: 'fake-id',
      fecha: new Date(),
      hora: '10:00',
    };

    (CitaService.create as jest.Mock).mockResolvedValue(mockCita);

    const response = await request(app)
      .post('/api/citas')
      .send({
        fecha: '2023-10-10',
        hora: '10:00',
        paciente: { nombre: 'Test', correo: 'test@example.com' },
        doctor: 'doctor-id',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockCita);
  });

  it('retorna 500 si el servicio falla', async () => {
    (CitaService.create as jest.Mock).mockRejectedValue(new Error('Error de prueba'));

    const response = await request(app)
      .post('/api/citas')
      .send({});

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error al crear la cita.');
  });
});