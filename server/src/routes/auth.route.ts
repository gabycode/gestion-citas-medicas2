import { RequestHandler, Router } from "express";
import * as authController from "../controllers/auth.controller";
import { authToken } from "../middleware/auth.middleware";
import logger from "../utils/logger";

const router = Router();

router.use((req, res, next) => {
  logger.info(
    {
      method: req.method,
      url: req.originalUrl,
      body: req.body,
    },
    `Solicitud recibida: ${req.method} ${req.originalUrl}`
  );
  next();
});

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Endpoints relacionados a login, registro y recuperación de contraseña
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterDoctor:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - especialidad
 *         - telefono
 *         - email
 *         - password
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         especialidad:
 *           type: string
 *         telefono:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         nombre: Laura
 *         apellido: Gómez
 *         especialidad: Cardiología
 *         telefono: "+584123456789"
 *         email: laura@example.com
 *         password: strongPassword123
 *
 *     LoginDoctor:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: laura@example.com
 *         password: strongPassword123
 *
 *     ForgotPassword:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *       example:
 *         email: laura@example.com
 *
 *     ResetPassword:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         otp:
 *           type: string
 *         password:
 *           type: string
 *           format: password
 *       example:
 *         email: laura@example.com
 *         otp: "123456"
 *         password: newStrongPassword456
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Registrar un nuevo doctor
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDoctor'
 *     responses:
 *       201:
 *         description: Registro exitoso
 *       400:
 *         description: El email ya está en uso
 */
router.post("/signup",authController.registerDoctor);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDoctor'
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales incorrectas
 */
router.post("/login", authController.loginDoctor);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar OTP para recuperación de contraseña
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: OTP enviado correctamente
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Resetear contraseña con OTP
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 */
router.post("/reset-password", authController.resetPassword);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener perfil del doctor autenticado
 *     tags: [Autenticación]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del doctor
 *       401:
 *         description: No autorizado
 */
router.get("/me", authToken, authController.getDoctorProfile as RequestHandler);

export default router;
