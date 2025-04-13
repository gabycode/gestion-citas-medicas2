#Etapa 1: Build
FROM node:23-slim AS builder

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Compilar el proyecto TypeScript
RUN npm run build

# Etapa 2: Runtime
FROM node:23-slim AS runner

# Create and set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Expose the port the app runs on
EXPOSE 3030

# Start the application
CMD ["node", "dist/server.js"]