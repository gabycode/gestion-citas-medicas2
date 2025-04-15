import { RequestHandler, Router } from "express";
import { authToken } from "../middleware/auth.middleware";
import * as doctorController from "../controllers/doctor.controller";
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
 *   name: Doctores
 *   description: Endpoints para gestionar doctores
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateDoctor:
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
 *         email: laura.gomez@example.com
 *         password: strongPassword123
 *
 *     Doctor:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateDoctor'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 */

/**
 * @swagger
 * /doctores:
 *   get:
 *     summary: Obtener todos los doctores
 *     tags: [Doctores]
 *     responses:
 *       200:
 *         description: Lista de doctores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doctor'
 */
router.get("/", doctorController.getAllDoctors);

router.post("/", doctorController.createDoctor as RequestHandler);

/**
 * @swagger
 * /doctores/citas:
 *   get:
 *     summary: Obtener citas asociadas al doctor autenticado
 *     tags: [Doctores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de citas del doctor
 */
router.get(
  "/citas",
  authToken,
  doctorController.getCitasDoctor as RequestHandler
);

/**
 * @swagger
 * /doctores/{id}:
 *   get:
 *     summary: Obtener un doctor por ID
 *     tags: [Doctores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del doctor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor no encontrado
 */
router.get("/:id", doctorController.getDoctorById as RequestHandler);

/**
 * @swagger
 * /doctores/{id}:
 *   put:
 *     summary: Actualizar un doctor
 *     tags: [Doctores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDoctor'
 *     responses:
 *       200:
 *         description: Doctor actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: El email ya está en uso por otro doctor
 *       404:
 *         description: Doctor no encontrado para actualizar
 */
router.put("/:id", doctorController.updateDoctor as RequestHandler);

/**
 * @swagger
 * /doctores/{id}:
 *   delete:
 *     summary: Eliminar un doctor
 *     tags: [Doctores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Doctor eliminado correctamente
 *       404:
 *         description: Doctor no encontrado para eliminar
 */
router.delete("/:id", doctorController.deleteDoctor as RequestHandler);

export default router;
