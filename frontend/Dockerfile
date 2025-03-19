# Stage 1: Build the production assets using Node
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build production assets
COPY frontend /app
RUN npm run build

# Stage 2: Serve the production assets using Nginx with your custom config
FROM nginx:stable-alpine

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Remove default static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy the production build from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 8080 as specified in your Nginx config and docker-compose
EXPOSE 8080

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
