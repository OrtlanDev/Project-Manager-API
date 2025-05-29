import { Prisma, PrismaClient } from "@prisma/client";
import { CollisionError } from "../errors/errors.js";

const prisma = new PrismaClient();

export class ProjectService {
    static async findAllByUserId(userId) {
        return prisma.project.findMany({
            where: { userId },
            include: { tasks: true },
        });
    }

    static async findById(id, userId) {
        return prisma.project.findFirst({
            where: { id, userId },
            include: { tasks: true },
        });
    }

    static async create(data) {
        try {
            const project = await prisma.project.create({ data });
            return project;
        } catch (err) {
            const isCollisionError = err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002";
            if (isCollisionError) {
                const field = err.meta?.target[0] || "unknown";
                throw new CollisionError(field);
            }
            throw err;
        }
    }

    static async update(id, updates, userId) {
        try {
            const res = await prisma.project.updateMany({
                where: { id, userId },
                data: updates,
            });
            return res.count ? prisma.project.findUnique({ where: { id } }) : null;
        } catch (err) {
            const isCollisionError = err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002";
            if (isCollisionError) {
                const field = err.meta?.target[0] || "unknown";
                throw new CollisionError(field);
            }
            throw err;
        }
    }

    static async remove(id, userId) {
        try {
            const result = await prisma.project.deleteMany({
                where: { id, userId },
            });
            return result.count > 0;
        } catch (err) {
            console.error("Error deleting project:", err);
            if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
                console.log("Project not found or without permits");
            }
            throw err;
        }
    }
}
