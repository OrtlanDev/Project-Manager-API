import { AuthService } from "../services/auth.service.js";

export class AuthController {
    static async register(req, res, next) {
        const { username, email, password } = req.body;

        try {
            const { user, token } = await AuthService.register(username, email, password);

            return res.status(201).json({
                success: true,
                user: {
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        } catch (err) {
            next(err);
        }
    }

    static async login(req, res, next) {
        const { username, password } = req.body;

        try {
            const { user, token } = await AuthService.login(username, password);
            return res.status(200).json({
                success: true,
                user: {
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        } catch (err) {
            next(err);
        }
    }
}
