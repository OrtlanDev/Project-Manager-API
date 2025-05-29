import { NotFoundError } from "../errors/errors.js";
import { TaskService } from "../services/tasks.service.js";

export class TaskController {
    static async getAll(req, res, next) {
        try {
            const { projectId } = req.params;
            const tasks = await TaskService.findAll(projectId, req.user.userId);
            res.json(tasks);
        } catch (err) {
            next(err);
        }
    }

    static async getById(req, res, next) {
        try {
            const { projectId, id } = req.params;
            const task = await TaskService.findById(id, projectId, req.user.userId);
            if (!task) return res.status(404).json({ message: "Task not found" });
            res.json(task);
        } catch (err) {
            next(err);
        }
    }

    static async create(req, res, next) {
        console.log(req);

        try {
            const { projectId } = req.params;
            const task = await TaskService.create(req.body, projectId, req.user.userId);
            res.status(201).json(task);
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const { projectId, id } = req.params;
            const task = await TaskService.update(id, req.body, projectId, req.user.userId);
            if (!task) throw new NotFoundError("Task not found or without permits");
            res.json(task);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const { projectId, id } = req.params;
            const deleted = await TaskService.remove(id, projectId, req.user.userId);
            if (!deleted) return res.status(404).json({ message: "Task not found or without permits" });
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}
