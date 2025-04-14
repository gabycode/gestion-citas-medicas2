import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/AuthRequest";

export const authToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
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

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: "Token inválido ❌",
    });
  }
};