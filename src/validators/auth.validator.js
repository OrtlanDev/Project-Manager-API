const MIN_USERNAME_LENGTH = 1;
const MIN_PASSWORD_LENGTH = 8;

import { body } from "express-validator";

export const usernameValidator = body("username")
    .notEmpty()
    .withMessage("The username is mandatory")
    .isLength({ min: MIN_USERNAME_LENGTH })
    .withMessage(`Must have at least ${MIN_USERNAME_LENGTH} character`)
    .trim()
    .escape();

export const passwordValidator = body("password")
    .notEmpty()
    .withMessage("The password is mandatory")
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(`You must have at least ${MIN_PASSWORD_LENGTH} characters`)
    .trim()
    .escape();

export const emailValidator = body("email")
    .notEmpty()
    .withMessage("Mail is mandatory")
    .isEmail()
    .withMessage("It must be a valid email")
    .normalizeEmail();

export const registerValidation = () => [usernameValidator, emailValidator, passwordValidator];

export const loginValidation = () => [usernameValidator, passwordValidator];
