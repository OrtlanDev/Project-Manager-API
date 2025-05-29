import { AuthorizationError } from "../errors/errors.js";
import { verifyToken } from "../utils/jwt.utils.js";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AuthorizationError("credentials", "Token not provided");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (err) {
        throw new AuthorizationError("credentials", "Invalid or expired token");
    }
}
