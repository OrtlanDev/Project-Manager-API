import { body, param } from "express-validator";

const TITLE_MIN = 3;
const TITLE_MAX = 100;
const DESC_MAX = 500;

const projectIdParam = param("projectId").isUUID().withMessage("The projectId must be a valid UUID");

const taskIdParam = param("id").isUUID().withMessage("The task id must be a valid UUID");

const titleValidator = body("title")
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: TITLE_MIN, max: TITLE_MAX })
    .withMessage(`Title must be between ${TITLE_MIN} and ${TITLE_MAX} characters long`)
    .trim()
    .escape();

const descriptionValidator = body("description")
    .optional()
    .isLength({ max: DESC_MAX })
    .withMessage(`Description cannot exceed ${DESC_MAX} characters`)
    .trim()
    .escape();

const optionalTitleValidator = body("title")
    .optional()
    .isLength({ min: TITLE_MIN, max: TITLE_MAX })
    .withMessage(`Title must be between ${TITLE_MIN} and ${TITLE_MAX} characters long`)
    .trim()
    .escape();

const optionalDescriptionValidator = body("description")
    .optional()
    .isLength({ max: DESC_MAX })
    .withMessage(`Description cannot exceed ${DESC_MAX} characters`)
    .trim()
    .escape();

const completedValidator = body("completed")
    .optional()
    .isBoolean()
    .withMessage("The 'completed' field must be a boolean")
    .toBoolean();

export const createTaskValidation = () => [projectIdParam, titleValidator, descriptionValidator];

export const updateTaskValidation = () => [
    projectIdParam,
    taskIdParam,
    optionalTitleValidator,
    optionalDescriptionValidator,
    completedValidator,
];

export const getTaskByIdValidation = () => [projectIdParam, taskIdParam];

export const deleteTaskValidation = () => [projectIdParam, taskIdParam];
