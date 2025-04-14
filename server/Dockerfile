FROM node:23-slim AS base

WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# En desarrollo, instalar todas las dependencias incluyendo las de dev
FROM base AS development
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# En producción, compilamos la app primero
FROM base AS build
RUN npm install
COPY . .
RUN npm run build

# Imagen final de producción
FROM node:23-slim AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist-server ./dist
COPY package*.json ./
RUN npm install --omit=dev
EXPOSE 3030
CMD ["node", "dist/server.js"]