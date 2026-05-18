# 📝 Todo App - DevOps Lab Project

A simple full-stack Task Manager built with **React + Express**, containerized with **Docker**.  
Designed for college DevOps lab exams.

---

## 🏗️ Project Structure

```
todo-app/
├── frontend/          # React app (Vite)
│   ├── src/
│   │   ├── App.jsx            # Main component
│   │   ├── App.css            # Styles
│   │   ├── main.jsx           # Entry point
│   │   └── components/
│   │       ├── TaskForm.jsx   # Add task form
│   │       ├── TaskList.jsx   # Task list
│   │       └── TaskItem.jsx   # Single task
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── backend/           # Express API
│   ├── server.js      # API server
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint       | Description              |
|--------|---------------|--------------------------|
| GET    | `/tasks`      | Fetch all tasks          |
| POST   | `/tasks`      | Create a new task        |
| PUT    | `/tasks/:id`  | Toggle task completion   |
| DELETE | `/tasks/:id`  | Delete a task            |

---

## 🖥️ Run Locally (Without Docker)

### Step 1: Start the Backend

```bash
cd backend
npm install
npm start
```

Backend will run at: **http://localhost:5000**

### Step 2: Start the Frontend (in a new terminal)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: **http://localhost:3000**

Open **http://localhost:3000** in your browser.

---

## 🐳 Run with Docker

### Option 1: Docker Compose (Recommended)

Build and start both services:

```bash
docker-compose up --build
```

This will:
- Build the frontend image
- Build the backend image
- Start both containers
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Option 2: Build and Run Individually

**Build images:**

```bash
# Build backend image
docker build -t todo-backend ./backend

# Build frontend image
docker build -t todo-frontend ./frontend
```

**Run containers:**

```bash
# Run backend
docker run -d -p 5000:5000 --name todo-backend todo-backend

# Run frontend
docker run -d -p 3000:3000 -e VITE_API_URL=http://localhost:5000 --name todo-frontend todo-frontend
```

---

## 🛑 Stop Containers

```bash
# Stop with docker-compose
docker-compose down

# OR stop individual containers
docker stop todo-frontend todo-backend
docker rm todo-frontend todo-backend
```

---

## 🔄 Rebuild Containers (After Code Changes)

```bash
# Rebuild and restart
docker-compose up --build

# Force rebuild without cache
docker-compose build --no-cache
docker-compose up
```

---

## 🔧 Environment Variables

| Variable       | Where      | Default                   | Description           |
|---------------|------------|---------------------------|-----------------------|
| `PORT`        | Backend    | `5000`                    | Backend server port   |
| `VITE_API_URL`| Frontend   | `http://localhost:5000`   | Backend API URL       |

---

## 📋 Useful Docker Commands

```bash
# List running containers
docker ps

# View logs of a container
docker logs todo-backend
docker logs todo-frontend

# Enter a running container's shell
docker exec -it todo-backend sh
docker exec -it todo-frontend sh

# List all images
docker images

# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune
```

---

## 🧑‍💻 Tech Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Storage:** In-memory array (no database)
- **Containerization:** Docker + Docker Compose

---

## ❓ Common Viva Questions

1. **What is Docker?**  
   Docker is a platform for building, shipping, and running applications in containers.

2. **What is a Dockerfile?**  
   A Dockerfile is a text file with instructions to build a Docker image.

3. **What is Docker Compose?**  
   Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file.

4. **What does `depends_on` do?**  
   It ensures one service starts before another (e.g., backend starts before frontend).

5. **Why do we use CORS?**  
   CORS (Cross-Origin Resource Sharing) allows the frontend (port 3000) to make API requests to the backend (port 5000).

6. **What does `EXPOSE` do in a Dockerfile?**  
   It documents which port the container listens on. Actual port mapping is done with `-p` flag or in docker-compose.

7. **Why copy package.json before source code in Dockerfile?**  
   For Docker layer caching — if dependencies haven't changed, Docker reuses the cached `npm install` layer, making builds faster.
