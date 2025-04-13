ARG NODE_ENV=production
FROM node:23-slim AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS build
RUN npm run build

FROM base AS development
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

FROM node:23-slim AS production
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist-client ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]