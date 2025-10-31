# --- Stage 1: Build ---
# Use an official Node.js image as the builder.
# We use 'alpine' for a smaller base image.
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
# We copy these first to leverage Docker's layer caching.
# If these files don't change, 'npm install' won't re-run.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app for production
# This creates a 'build' folder with static files.
RUN npm run build

# --- Stage 2: Serve ---
# Use an official Nginx image as the server.
# 'alpine' is a very small Linux distribution.
FROM nginx:1.25-alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove the default Nginx welcome page
RUN rm -f index.html

# Copy the built static files from the 'builder' stage (Stage 1)
# The 'build' folder is the default output for create-react-app
COPY --from=builder /app/build .

# Expose port 80 (the default port Nginx listens on)
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]