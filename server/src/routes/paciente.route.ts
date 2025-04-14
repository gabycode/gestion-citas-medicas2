import { Router } from "express";
import * as pacienteController from "../controllers/paciente.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints para gestionar pacientes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreatePaciente:
 *       type: object
 *       required:
 *         - nombre
 *         - apellido
 *         - telefono
 *         - correo
 *       properties:
 *         nombre:
 *           type: string
 *         apellido:
 *           type: string
 *         telefono:
 *           type: string
 *         correo:
 *           type: string
 *           format: email
 *       example:
 *         nombre: Juan
 *         apellido: Pérez
 *         telefono: "+584241234567"
 *         correo: juan.perez@example.com
 *
 *     Paciente:
 *       allOf:
 *         - $ref: '#/components/schemas/CreatePaciente'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Obtener todos los pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Paciente'
 */
router.get("/", pacienteController.getAllPatients);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Crear un nuevo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePaciente'
 *     responses:
 *       201:
 *         description: Paciente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: El correo ya está registrado
 */
router.post("/", pacienteController.createPatient);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Obtener un paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle del paciente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       404:
 *         description: Paciente no encontrado
 */
router.get("/:id", pacienteController.getPatientById);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Actualizar un paciente
 *     tags: [Pacientes]
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
 *             $ref: '#/components/schemas/CreatePaciente'
 *     responses:
 *       200:
 *         description: Paciente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Paciente'
 *       400:
 *         description: El correo ya está en uso por otro paciente
 *       404:
 *         description: Paciente no encontrado para actualizar
 */
router.put("/:id", pacienteController.updatePatient);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Eliminar un paciente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Paciente eliminado correctamente
 *       404:
 *         description: Paciente no encontrado para eliminar
 */
router.delete("/:id", pacienteController.deletePatient);

export default router;
