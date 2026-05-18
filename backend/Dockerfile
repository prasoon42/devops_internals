# ============================================
# Dockerfile for Todo App Backend
# ============================================
# This Dockerfile creates a container for our Express server.
# It uses a Node.js base image to run our JavaScript code.
# ============================================

# Step 1: Use official Node.js image as base
# "alpine" is a lightweight Linux distribution (smaller image size)
FROM node:18-alpine

# Step 2: Set the working directory inside the container
# All subsequent commands will run from this directory
WORKDIR /app

# Step 3: Copy package.json first (for better Docker layer caching)
# This way, npm install only re-runs if dependencies change
COPY package.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Tell Docker which port this container uses
# This is documentation only — actual mapping is done in docker-compose
EXPOSE 5000

# Step 7: Command to start the server
CMD ["node", "server.js"]
