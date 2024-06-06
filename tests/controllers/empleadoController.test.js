import request from 'supertest';
import app from '../../src/app'; // Asegúrate de exportar tu aplicación express en app.js
import Empleado from '../../src/models/empleadoModel';
import bcrypt from 'bcrypt';
import { generarToken } from '../../src/middleware/auth';

jest.mock('../../src/models/empleadoModel');
jest.mock('bcrypt');
jest.mock('../../src/middleware/auth');

describe('loginEmpleado', () => {
  let empleadoData;

  beforeEach(() => {
    empleadoData = {
      ID_Empleado: 1,
      Nombre: 'Juan Perez',
      Correo: 'juan@example.com',
      Contrasena: 'hashedpassword'
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debería responder con 404 si el correo no existe', async () => {
    Empleado.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/login')
      .send({ correo: 'correo_no_existente@example.com', contrasena: 'password123' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('El correo no existe');
  });

  it('debería responder con 401 si la contraseña es incorrecta', async () => {
    Empleado.findOne.mockResolvedValue(empleadoData);
    bcrypt.compare.mockResolvedValue(false);

    const response = await request(app)
      .post('/login')
      .send({ correo: 'juan@example.com', contrasena: 'password_incorrecto' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Contraseña incorrecta');
  });

  it('debería responder con 200 y un token si las credenciales son correctas', async () => {
    Empleado.findOne.mockResolvedValue(empleadoData);
    bcrypt.compare.mockResolvedValue(true);
    generarToken.mockReturnValue('fakeToken');

    const response = await request(app)
      .post('/login')
      .send({ correo: 'juan@example.com', contrasena: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('fakeToken');
    expect(response.body.data).toEqual({
      id: empleadoData.ID_Empleado,
      nombre: empleadoData.Nombre,
      correo: empleadoData.Correo,
    });
  });

  it('debería responder con 500 en caso de error en el servidor', async () => {
    Empleado.findOne.mockRejectedValue(new Error('Database error'));

    const response = await request(app)
      .post('/login')
      .send({ correo: 'juan@example.com', contrasena: 'password123' });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error al obtener el Empleado');
  });
});
