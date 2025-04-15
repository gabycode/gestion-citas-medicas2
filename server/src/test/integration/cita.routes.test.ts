import request from 'supertest';
import app from '../../app';

describe('GET /api/citas', () => {
  it('debería responder con 200 y un array', async () => {
    const response = await request(app).get('/api/citas');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, 10000); // timeout extendido
});
