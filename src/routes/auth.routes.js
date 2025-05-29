import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { handleInputErrors } from "../middlewares/validation.middleware.js";
import { loginValidation, registerValidation } from "../validators/auth.validator.js";

const router = Router();

router.post("/register", registerValidation(), handleInputErrors, AuthController.register);
router.post("/login", loginValidation(), handleInputErrors, AuthController.login);

export default router;
