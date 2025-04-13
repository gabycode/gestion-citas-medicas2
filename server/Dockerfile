ARG NODE_ENV=production
FROM node:23-slim AS base

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .

# En producción compilamos y usamos solo dist
FROM base AS build
RUN npm run build

FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM node:23-slim AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --omit=dev
EXPOSE 3030
CMD ["node", "dist/server.js"]