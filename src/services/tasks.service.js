import { PrismaClient } from "@prisma/client";
import { ForbiddenError, NotFoundError } from "../errors/errors.js";

const prisma = new PrismaClient();

export class TaskService {
    static async _checkProjectOwnership(projectId, userId) {
        const project = await prisma.project.findUnique({
            where: { id: projectId },
            select: { userId: true },
        });
        console.log("id", userId, project.userId);

        if (!project) throw new NotFoundError("Project not found");
        if (project.userId !== userId) throw new ForbiddenError("No permission on this project");
    }

    static async findAll(projectId, userId) {
        await this._checkProjectOwnership(projectId, userId);
        return prisma.task.findMany({
            where: { projectId },
            orderBy: { createdAt: "desc" },
        });
    }

    static async findById(id, projectId, userId) {
        await this._checkProjectOwnership(projectId, userId);
        return prisma.task.findFirst({
            where: { id, projectId },
        });
    }

    static async create(data, projectId, userId) {
        await this._checkProjectOwnership(projectId, userId);
        return prisma.task.create({
            data: { ...data, projectId },
        });
    }

    static async update(id, updates, projectId, userId) {
        await this._checkProjectOwnership(projectId, userId);
        const result = await prisma.task.updateMany({
            where: { id, projectId },
            data: updates,
        });
        if (result.count === 0) return null;
        return prisma.task.findUnique({ where: { id } });
    }

    static async remove(id, projectId, userId) {
        await this._checkProjectOwnership(projectId, userId);
        const result = await prisma.task.deleteMany({
            where: { id, projectId },
        });
        return result.count > 0;
    }
}
