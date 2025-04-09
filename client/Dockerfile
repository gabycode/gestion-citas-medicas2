FROM node:23-slim
# Create and set the working directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the React app
RUN npm run build
# Install serve to serve the production build
RUN npm install -g serve
# Expose the port the app runs on
EXPOSE 3000
# Start the application
CMD ["serve", "-s", "dist-client"]