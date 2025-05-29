import { Router } from "express";
import { TaskController } from "../controllers/tasks.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { handleInputErrors } from "../middlewares/validation.middleware.js";
import {
    createTaskValidation,
    deleteTaskValidation,
    getTaskByIdValidation,
    updateTaskValidation,
} from "../validators/tasks.validator.js";

const router = Router({ mergeParams: true });

router.use(authenticate);
router.get("", TaskController.getAll);
router.get("/:id", getTaskByIdValidation(), handleInputErrors, TaskController.getById);
router.post("", createTaskValidation(), handleInputErrors, TaskController.create);
router.patch("/:id", updateTaskValidation(), handleInputErrors, TaskController.update);
router.delete("/:id", deleteTaskValidation(), handleInputErrors, TaskController.delete);

export default router;
