import { validationResult } from "express-validator";
import { ValidationError } from "../errors/errors.js";

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().reduce((acc, error) => {
            const { path, type, msg, value } = error;
            const text = `${msg}${value ? ` (${value})` : ""}`;

            let entry = acc.find((e) => e.location === path);
            if (!entry) {
                entry = { location: path, errorType: "validationError", messages: [] };
                acc.push(entry);
            }

            entry.messages.push(text);
            return acc;
        }, []);

        const valError = new ValidationError("username", formattedErrors);
        return res.status(valError.statusCode).json(valError);
    }

    return next();
};
