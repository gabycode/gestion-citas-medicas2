import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest";
import logger from "../utils/logger";

export const authToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
      logger.warn("🔐 Token no proporcionado en la solicitud");
      res.status(401).json({
        statusCode: 401,
        message: "No se proporcionó un token",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "dev-secret"
    ) as AuthRequest["user"];

    if (decoded) {
      req.user = decoded;
      logger.info(
        `✅ Token válido. Usuario: ${decoded.email || "desconocido"}`
      );
    } else {
      throw new Error("Token decoding failed");
    }
    next();
  } catch (error) {
    logger.error("❌ Error al verificar el token", error);
    res.status(401).json({
      statusCode: 401,
      message: "Token inválido ❌",
    });
  }
};
