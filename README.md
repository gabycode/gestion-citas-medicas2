# 🏥 Gestión de Citas Médicas

Sistema de gestión de citas médicas desarrollado con TypeScript, Express, MongoDB (NoSQL), Mongoose como ORM y arquitectura limpia. El proyecto está completamente dockerizado y separado en frontend y backend.

🎥 **Video explicativo del proyecto:**  
[![Ver en YouTube](https://img.youtube.com/vi/w5HNPBeI4zQ/0.jpg)](https://youtu.be/w5HNPBeI4zQ)

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
- **Swagger (Documentación automática de API)**

---

## 🐳 Cómo correr el proyecto

Asegúrate de tener **Docker** y **Docker Compose** instalados.

1. Clona este repositorio:

   ```bash
   git clone https://github.com/gabycode/gestion-citas-medicas2.git
   cd gestion-citas-medicas2
   ```

2. Construye las imágenes y inicia los contenedores:

   ```bash
   docker-compose up --build -d
   ```

3. Accede a las interfaces:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend (API): [http://localhost:3030](http://localhost:3030)
- **Documentación Swagger**: [http://localhost:3030/api-docs](http://localhost:3030/api-docs)

### Pruebas unitarias

```bash
cd server
npm test
```

---

## 🧱 Estructura de Carpetas

```bash
/server
  ├── src/
  │   ├── controllers/
  │   ├── interfaces/
  │   ├── middleware/
  │   ├── models/
  │   ├── routes/
  │   ├── seeds/
  │   ├── services/
  │   ├── tests /
  │   ├── types/
  │   ├── utils/
  │   └── App.ts
  ├── jest.config.ts/
  ├── server.ts/
  ├── swagger.ts/
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

---

## 📅 Funcionalidad Principal

- Registro automático de paciente si no existe
- Agendamiento de cita (con doctor, fecha y hora)
- Envío de confirmación de cita por correo
- Listado de citas por doctor
- CRUD completo para doctores, pacientes y citas
- Autenticación con JWT y recuperación de contraseña por OTP

---

## 📬 Endpoints principales (API REST)

| Recurso  | Método | Ruta                      | Descripción                           |
| -------- | ------ | ------------------------- | ------------------------------------- |
| Doctor   | GET    | /api/doctores             | Obtener todos los doctores            |
|          | POST   | /api/doctores             | Crear nuevo doctor                    |
|          | GET    | /api/doctores/:id         | Obtener un doctor por ID              |
|          | PUT    | /api/doctores/:id         | Actualizar doctor                     |
|          | DELETE | /api/doctores/:id         | Eliminar doctor                       |
|          | GET    | /api/doctores/citas       | Obtener citas del doctor autenticado  |
| Paciente | GET    | /api/pacientes            | Obtener todos los pacientes           |
|          | POST   | /api/pacientes            | Crear nuevo paciente                  |
|          | GET    | /api/pacientes/:id        | Obtener un paciente por ID            |
|          | PUT    | /api/pacientes/:id        | Actualizar paciente                   |
|          | DELETE | /api/pacientes/:id        | Eliminar paciente                     |
| Cita     | GET    | /api/citas                | Obtener todas las citas               |
|          | POST   | /api/citas                | Crear nueva cita                      |
|          | GET    | /api/citas/:id            | Obtener cita por ID                   |
|          | PUT    | /api/citas/:id            | Actualizar cita                       |
|          | DELETE | /api/citas/:id            | Eliminar cita                         |
| Auth     | POST   | /api/auth/signup          | Registrar nuevo doctor                |
|          | POST   | /api/auth/login           | Login y obtención de token            |
|          | POST   | /api/auth/forgot-password | Solicitar código OTP por correo       |
|          | POST   | /api/auth/reset-password  | Resetear contraseña con OTP           |
|          | GET    | /api/auth/me              | Obtener perfil del doctor autenticado |

---

## 📄 Documentación Swagger

La documentación de todos los endpoints está disponible automáticamente a través de Swagger.

📚 [http://localhost:3030/api-docs] (http://localhost:3030/api-docs)

Incluye:

- Modelos de datos (`schemas`)
- Métodos HTTP soportados
- Parámetros y requestBody
- Ejemplos de respuestas

---

## 🧪 Pruebas con Postman

- `POST /auth/signup` → Registrar doctor
- `POST /auth/login` → Obtener token
- `GET /auth/me` con header:
  ```
  Authorization: Bearer TU_TOKEN
  ```
- `POST /auth/forgot-password` → Solicitar OTP
- `POST /auth/reset-password` → Cambiar contraseña

---

¡Listo para usar, escalar y documentar como un profesional! 🚀
