import { RequestHandler, Router } from "express";
import * as citaController from "../controllers/cita.controller";

const router = Router();

router.get("/", citaController.getAllAppointments);
router.post("/", citaController.createAppointment);
router.get("/:id", citaController.getAppointmentById as RequestHandler);
router.put("/:id", citaController.updateAppointment as RequestHandler);
router.delete("/:id", citaController.deleteAppointment as RequestHandler);

export default router;
