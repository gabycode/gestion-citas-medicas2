FROM node:23-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./

# Etapa de desarrollo
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Etapa de testing
FROM base AS test
ENV NODE_ENV=test
RUN npm install
COPY . .
CMD ["npm", "test"]

# Etapa de build
FROM base AS build
RUN npm install
COPY . .

RUN npm run generate:swagger

RUN npm run build

# Etapa de producción final
FROM node:23-slim AS production
WORKDIR /usr/src/app

# Copiamos solo lo necesario
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/swagger-output.json ./swagger-output.json
COPY package*.json ./

# Instala solo dependencias necesarias para producción
RUN npm install --omit=dev

EXPOSE 3030

CMD ["node", "dist/server.js"]
