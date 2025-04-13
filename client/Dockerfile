# Etapa 1: build
FROM node:23-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: servir el contenido estático
FROM node:23-slim

WORKDIR /app
RUN npm install -g serve

COPY --from=builder /app/dist-client ./dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]