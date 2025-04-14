import { RequestHandler, Router } from "express";
import * as citaController from "../controllers/cita.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Endpoints para gestionar citas médicas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateCita:
 *       type: object
 *       required:
 *         - fecha
 *         - hora
 *         - paciente
 *         - doctor
 *       properties:
 *         fecha:
 *           type: string
 *           format: date
 *         hora:
 *           type: string
 *         paciente:
 *           type: string
 *         doctor:
 *           type: string
 *       example:
 *         fecha: "2025-04-15"
 *         hora: "10:30 AM"
 *         paciente: "660fab1234aa9876543210fe"
 *         doctor: "660faa1234aa9876543210ab"
 *
 *     Cita:
 *       allOf:
 *         - $ref: '#/components/schemas/CreateCita'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 */

/**
 * @swagger
 * /citas:
 *   get:
 *     summary: Obtener todas las citas
 *     tags: [Citas]
 *     responses:
 *       200:
 *         description: Lista de citas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cita'
 */
router.get("/", citaController.getAllAppointments);

/**
 * @swagger
 * /citas:
 *   post:
 *     summary: Crear una nueva cita
 *     tags: [Citas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCita'
 *     responses:
 *       201:
 *         description: Cita creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 */
router.post("/", citaController.createAppointment);

/**
 * @swagger
 * /citas/{id}:
 *   get:
 *     summary: Obtener una cita por ID
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la cita
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       404:
 *         description: Cita no encontrada
 */
router.get("/:id", citaController.getAppointmentById as RequestHandler);

/**
 * @swagger
 * /citas/{id}:
 *   put:
 *     summary: Actualizar una cita
 *     tags: [Citas]
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
 *             $ref: '#/components/schemas/CreateCita'
 *     responses:
 *       200:
 *         description: Cita actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cita'
 *       404:
 *         description: Cita no encontrada para actualizar
 */
router.put("/:id", citaController.updateAppointment as RequestHandler);

/**
 * @swagger
 * /citas/{id}:
 *   delete:
 *     summary: Eliminar una cita
 *     tags: [Citas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Cita eliminada correctamente (sin contenido)
 *       404:
 *         description: Cita no encontrada para eliminar
 */
router.delete("/:id", citaController.deleteAppointment as RequestHandler);

export default router;
