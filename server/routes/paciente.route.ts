import { Router } from "express";
import * as pacienteController from "../controllers/paciente.controller";

const router = Router();

router.get("/", pacienteController.getAllPatients);
router.post("/", pacienteController.createPatient);
router.get("/:id", pacienteController.getPatientById);
router.put("/:id", pacienteController.updatePatient);
router.delete("/:id", pacienteController.deletePatient);

export default router;
