import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.utils.js";

const SALT_ROUNDS = 10;
const prisma = new PrismaClient();

export class AuthService {
    static async register(username, email, password) {
        try {
            const errors = [];

            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [{ email }, { username }],
                },
            });

            if (existingUser) {
                if (existingUser.email === email) {
                    errors.push("This email is already registered");
                }

                if (existingUser.username === username) {
                    errors.push("This username is already in use");
                }
            }

            if (errors.length) {
                const error = new Error("Validation error");
                error.errors = errors;
                throw error;
            }

            const hashed = await bcrypt.hash(password, SALT_ROUNDS);

            const user = await prisma.user.create({
                data: { email, username, password: hashed },
            });

            const token = signToken({ userId: user.id });
            return { user, token };
        } catch (err) {
            if (err.errors) {
                const error = new Error(err.message);
                error.errors = err.errors;
                throw error;
            }

            throw new Error("Registration failed");
        }
    }

    static async login(username, password) {
        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            throw new Error("Invalid credentials");
        }

        const token = signToken({ userId: user.id });
        return { user, token };
    }
}
