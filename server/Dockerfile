# Etapa base con Node
FROM node:23-slim AS base
WORKDIR /usr/src/app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Etapa de desarrollo
FROM base AS development
ENV NODE_ENV=development

RUN npm install
COPY . .

# Agregamos Jest como comando de test
CMD ["npm", "run", "dev"]

# Etapa de build para producción
FROM base AS build
ENV NODE_ENV=production

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
