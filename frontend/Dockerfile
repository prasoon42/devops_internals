# ============================================
# Dockerfile for Todo App Frontend
# ============================================
# Runs the Vite dev server for the React app.
# ============================================

# Step 1: Use Node.js base image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json first for layer caching
COPY package.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy all source code
COPY . .

# Step 6: Expose port 3000 (Vite dev server)
EXPOSE 3000

# Step 7: Start the Vite dev server
CMD ["npm", "run", "dev"]
