import { Router } from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor);
router.get('/:id', doctorController.getDoctorById);
router.put('/:id', doctorController.updateDoctor);
router.delete('/:id', doctorController.deleteDoctor);

export default router;
