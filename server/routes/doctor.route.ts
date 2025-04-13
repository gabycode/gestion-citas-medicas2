import { RequestHandler, Router } from 'express';
import * as doctorController from '../controllers/doctor.controller';

const router = Router();

router.get('/', doctorController.getAllDoctors);
router.post('/', doctorController.createDoctor  as RequestHandler);
router.get('/:id', doctorController.getDoctorById as RequestHandler);
router.put('/:id', doctorController.updateDoctor as RequestHandler);
router.delete('/:id', doctorController.deleteDoctor as RequestHandler);

export default router;
