import express from "express";
import authRoutes from "./routes/auth.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const BASE_PATH = "/api/project-manager";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/projects`, projectsRoutes);
app.use(`${BASE_PATH}/projects/:projectId/tasks`, tasksRoutes);

export default app;
