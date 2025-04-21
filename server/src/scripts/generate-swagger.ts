import swaggerJSDoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Citas Médicas',
      version: '1.0.0',
    },
    servers: [{ url: 'http://localhost:3030/api' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
const outputPath = path.resolve(process.cwd(), 'swagger-output.json');

fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));
console.log(`✅ Swagger JSON generado en ${outputPath}`);
