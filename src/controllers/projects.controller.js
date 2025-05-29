import { NotFoundError } from "../errors/errors.js";
import { ProjectService } from "../services/projects.service.js";

export class ProjectController {
    static async getAllProjects(req, res, next) {
        try {
            const { userId } = req.user;
            const projects = await ProjectService.findAllByUserId(userId);
            res.json(projects);
        } catch (err) {
            next(err);
        }
    }

    static async getProjectById(req, res, next) {
        try {
            const { id } = req.params;
            const project = await ProjectService.findById(id, req.user.id);
            if (!project) return res.status(404).json({ message: "Project not found" });
            res.json(project);
        } catch (err) {
            next(err);
        }
    }

    static async createProject(req, res, next) {
        try {
            const data = { ...req.body, userId: req.user.userId };
            const project = await ProjectService.create(data);
            res.status(201).json(project);
        } catch (err) {
            next(err);
        }
    }

    static async updateProject(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const project = await ProjectService.update(id, updates, req.user.id);
            if (!project) {
                throw new NotFoundError("Project not found or without permits");
            }
            res.json(project);
        } catch (err) {
            next(err);
        }
    }

    static async deleteProject(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await ProjectService.remove(id, req.user.id);
            if (!deleted) return res.status(404).json({ message: "Project not found or without permits" });
            res.status(204).end();
        } catch (err) {
            next(err);
        }
    }
}
