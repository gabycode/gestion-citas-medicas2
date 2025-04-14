import { RequestHandler, Router } from "express";
import {registerDoctor, loginDoctor, forgotPassword, resetPassword, getDoctorProfile,} from "../controllers/auth.controller";
import {authToken} from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", registerDoctor);
router.post("/login", loginDoctor);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", authToken, getDoctorProfile as RequestHandler);

export default router;
