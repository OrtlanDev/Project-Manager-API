export class CustomError extends Error {
    constructor(
        location = "unknown",
        statusCode = 500,
        errorType = "InternalServerError",
        messages = "Internal server error",
        errors
    ) {
        super(messages);
        this.success = false;
        this.statusCode = statusCode;
        this.errors = errors || null;
        if (!errors) {
            this.errors = [
                {
                    location,
                    errorType,
                    messages: Array.isArray(messages) ? messages : [messages],
                },
            ];
        }
    }
}

export class JsonSyntaxError extends CustomError {
    constructor(message) {
        super("json", 400, "SyntaxError", message);
    }
}

export class NotFoundError extends CustomError {
    constructor(location) {
        super(location, 404, "NotFoundError", `${location} not found`);
    }
}

export class ValidationError extends CustomError {
    constructor(location, errors) {
        super(location, 400, "ValidationError", "", errors);
    }
}

export class AuthorizationError extends CustomError {
    constructor(location, message = "Unauthorized") {
        super(location, 401, "AuthorizationError", message);
    }
}

export class CollisionError extends CustomError {
    constructor(field) {
        super(field, 400, "CollisionError", `The field ${field} already exist`);
    }
}

export class InvalidCredentialsError extends CustomError {
    constructor(location, message = "Invalid credentials") {
        super(location, 401, "InvalidCredentialsError", message);
    }
}

export class DatabaseConnectionError extends CustomError {
    constructor() {
        super("database", 500, "DatabaseConnectionError", "Error connecting to the database");
    }
}

export class ForbiddenError extends CustomError {
    constructor(location, message = "Forbidden") {
        super(location, 403, "ForbiddenError", message);
    }
}
