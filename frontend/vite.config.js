import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for our React frontend
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Host 0.0.0.0 allows access from outside the container (important for Docker)
    host: "0.0.0.0",
    // Frontend runs on port 3000
    port: 3000,
  },
});
