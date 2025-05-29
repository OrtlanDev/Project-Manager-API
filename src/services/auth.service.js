import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { CollisionError, DatabaseConnectionError } from "../errors/errors.js";
import { signToken } from "../utils/jwt.utils.js";

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export class AuthService {
    static async register(username, email, password) {
        try {
            const hashed = await bcrypt.hash(password, SALT_ROUNDS);
            const user = await prisma.user.create({
                data: { email, username, password: hashed },
            });

            const token = signToken({ userId: user.id });
            return { user, token };
        } catch (err) {
            const isCollisionError = err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002";
            if (isCollisionError) {
                const field = err.meta?.target[0] || "unknown";
                throw new CollisionError(field);
            }
            throw err;
        }
    }

    static async login(username, password) {
        try {
            const user = await prisma.user.findUnique({ where: { username } });
            const location = "username or password fields";
            const message = "The username or password are wrong";
            if (!user) {
                throw new DatabaseConnectionError(location, message);
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new DatabaseConnectionError(location, message);
            }

            const token = signToken({ userId: user.id });
            return { user, token };
        } catch (err) {
            throw err;
        }
    }
}
