import { Prisma } from "@prisma/client";
import { CustomError, DatabaseConnectionError, JsonSyntaxError } from "../errors/errors.js";

export function errorHandler(err, req, res, next) {
    // json syntax error
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        const jsonErr = new JsonSyntaxError(err.message);
        return res.status(jsonErr.statusCode).json(jsonErr);
    }

    // database connection error
    if (err instanceof Prisma.PrismaClientInitializationError) {
        const dbErr = new DatabaseConnectionError();
        return res.status(dbErr.statusCode).json(dbErr);
    }

    if (err instanceof CustomError) {
        return res.status(err.statusCode).json(err);
    }

    const generic = new CustomError();
    return res.status(generic.statusCode).json({ success: false, errors: [generic.errors] });
}
