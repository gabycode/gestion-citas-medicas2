import { Router } from "express";
import * as citaController from "../controllers/cita.controller";

const router = Router();

router.get("/", citaController.getAllAppointments);
router.post("/", citaController.createAppointment);
router.get("/:id", citaController.getAppointmentById);
router.put("/:id", citaController.updateAppointment);
router.delete("/:id", citaController.deleteAppointment);

export default router;
