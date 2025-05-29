import { Router } from "express";
import { ProjectController } from "../controllers/projects.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { handleInputErrors } from "../middlewares/validation.middleware.js";
import {
    createProjectValidation,
    deleteProjectValidation,
    getProjectByIdValidation,
    getProjectsValidation,
    updateProjectValidation,
} from "../validators/project.validator.js";

const router = Router();

router.use(authenticate);
router.get("", getProjectsValidation(), handleInputErrors, ProjectController.getAllProjects);
router.get("/:id", getProjectByIdValidation(), handleInputErrors, ProjectController.getProjectById);
router.post("", createProjectValidation(), handleInputErrors, ProjectController.createProject);
router.put("/:id", updateProjectValidation(), handleInputErrors, ProjectController.updateProject);
router.delete("/:id", deleteProjectValidation(), handleInputErrors, ProjectController.deleteProject);

export default router;
