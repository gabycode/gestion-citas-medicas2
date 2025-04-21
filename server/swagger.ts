// src/swagger.ts
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
import fs from "fs";

export const setupSwagger = (app: Express): void => {
  const swaggerPath = path.join(__dirname, "..", "swagger-output.json");

  try {
    const swaggerFile = fs.readFileSync(swaggerPath, "utf8");
    const swaggerDocument = JSON.parse(swaggerFile);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log("✅ Swagger cargado desde swagger-output.json");
  } catch (error) {
    console.error("❌ Error cargando Swagger JSON:", error);
  }
};
