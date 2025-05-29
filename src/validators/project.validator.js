import { body, param, query } from "express-validator";

const TITLE_MIN = 1;
const TITLE_MAX = 100;
const DESC_MAX = 500;
const PAGE_MIN = 1;
const LIMIT_MIN = 1;
const LIMIT_MAX = 100;
const SEARCH_MIN = 1;
const SEARCH_MAX = 100;

const titleValidator = body("title")
    .notEmpty()
    .withMessage("The project title is mandatory")
    .isLength({ min: TITLE_MIN, max: TITLE_MAX })
    .withMessage(`The title must have between ${TITLE_MIN} and ${TITLE_MAX} characters`)
    .trim()
    .escape();

const optionalTitleValidator = body("title")
    .optional()
    .isLength({ min: TITLE_MIN, max: TITLE_MAX })
    .withMessage(`Title must be between ${TITLE_MIN} and ${TITLE_MAX} characters long`)
    .trim()
    .escape();

const descriptionValidator = body("description")
    .optional()
    .isLength({ max: DESC_MAX })
    .withMessage(`The description cannot exceed ${DESC_MAX} characters`)
    .trim()
    .escape();

const paramIdValidator = param("id").isUUID().withMessage("Project ID must be a valid UUID");

const pageValidator = query("page")
    .optional()
    .isInt({ min: PAGE_MIN })
    .withMessage("Page must be an integer greater than 0")
    .toInt();

const limitValidator = query("limit")
    .optional()
    .isInt({ min: LIMIT_MIN, max: LIMIT_MAX })
    .withMessage(`Limit must be a number between ${LIMIT_MIN} and ${LIMIT_MAX}`)
    .toInt();

const searchValidator = query("search")
    .optional()
    .isLength({ min: SEARCH_MIN, max: SEARCH_MAX })
    .withMessage(`Search query must be between ${SEARCH_MIN} and ${SEARCH_MAX} characters long`)
    .trim()
    .escape();

export const createProjectValidation = () => [titleValidator, descriptionValidator];

export const getProjectsValidation = () => [pageValidator, limitValidator, searchValidator];

export const getProjectByIdValidation = () => [paramIdValidator];

export const updateProjectValidation = () => [paramIdValidator, optionalTitleValidator, descriptionValidator];

export const deleteProjectValidation = () => [paramIdValidator];
