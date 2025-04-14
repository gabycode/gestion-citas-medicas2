# 🏥 Gestión de Citas Médicas

Sistema de gestión de citas médicas desarrollado con TypeScript, Express, MongoDB (NoSQL), Mongoose como ORM y arquitectura limpia. El proyecto está completamente dockerizado y separado en frontend y backend.

---

## 📦 Tecnologías

- TypeScript
- Express.js
- MongoDB + Mongoose
- Docker & Docker Compose
- Axios (Frontend)
- Jest (Pruebas unitarias)
- Logging (con `pino`)
- Arquitectura limpia (controllers, services, routes, interfaces, models)

---

## 🐳 Cómo correr el proyecto

Asegúrate de tener **Docker** y **Docker Compose** instalados.

1. Clona este repositorio:
   ```bash
   git clone https://github.com/gabycode/gestion-citas-medicas.git
   cd gestion-citas-medicas

2. Construye los imágenes:  
   ```bash
   docker-compose build

3. Inicia los contenedores:
   ```bash
   docker-compose up -d

4. Accede a las interfaces
- Frontend: http://localhost:3000
- Backend (API): http://localhost:3030

## 🧱 Estructura de Carpetas

```bash
/server
  ├── controllers/
  ├── routes/
  ├── models/
  ├── services/
  ├── middleware/
  ├── utils/
  ├── types/
  ├── server.ts
  ├── .env
  └── DockerFile

/client
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── services/
  │   ├── types/
  │   └── App.tsx
  ├── public/
  └── DockerFile
  ```

## 📅 Funcionalidad Principal

Registro automático de paciente si no existe.

Agendamiento de cita (con doctor, fecha y hora).

Envío de confirmación de cita por correo.

Listado de citas por doctor (próximamente).

CRUD completo para doctores, pacientes y citas.

## 📬 Endpoints principales (API REST)
| Recurso  | Metodo | Ruta               | Descripcion                 |
|----------|--------|--------------------|-----------------------------|
| Doctor   | GET    | /api/doctores/     | Obtener todos los doctores  |
|          | POST   | /api/doctores      | Crear nuevo doctor          |
|          | PUT    | /api/doctores/:id  | Actualizar doctor           |
|          | DELETE | /api/doctores/:id  | Eliminar doctor             |
| Paciente | GET    | /api/pacientes/    | Obtener todos los pacientes |
|          | POST   | /api/pacientes/    | Crear nuevo paciente        |
|          | PUT    | /api/pacientes/:id | Actualizar paciente         |
|          | DELTE  | /api/pacientes/:id | Eliminar paciente           |
| Cita     | GET    | /api/citas/        | Obtener todas las citas     |
|          | POST   | /api/citas/        | Crear nueva cita            |
|          | PUT    | /api/citas/:id     | Actualizar cita             |
|          | DELETE | /api/citas/:id     | Eliminar cita               |


## 🧪 Pruebas con Postman
POST /signup para registrar doctor.

POST /login para recibir el token.

GET /me con header:
Authorization: Bearer TU_TOKEN

POST /forgot-password para recibir OTP.

POST /reset-password para cambiar contraseña.
