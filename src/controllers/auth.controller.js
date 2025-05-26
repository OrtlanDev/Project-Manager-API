import { AuthService } from "../services/auth.service.js";
import { validateLogin, validateRegister } from "../validators/auth.validator.js";

export class AuthController {
    static async register(req, res) {
        const errors = validateRegister(req.body);
        if (errors.length) {
            return res.status(400).json({ errors });
        }

        const { username, email, password } = req.body;

        try {
            const { user, token } = await AuthService.register(username, email, password);

            return res.status(201).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        } catch (err) {
            if (err.errors) {
                return res.status(409).json({ errors: err.errors });
            }
        }
    }

    static async login(req, res) {
        const errors = validateLogin(req.body);
        if (errors.length) {
            return res.status(400).json({ errors });
        }
        const { username, password } = req.body;

        try {
            const { user, token } = await AuthService.login(username, password);
            return res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                },
                token,
            });
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }
}
