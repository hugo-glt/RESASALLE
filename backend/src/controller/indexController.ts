import type { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
    constructor(private userService = new UserService()) {}

    async register(req: Request, res: Response) {
        try {
            const user = await this.userService.register(req.body);
            return res.status(201).json({ message: "Created", data: user });
        } catch (error) {
            return res.status(400).json({ message: "Error", error });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const result = await this.userService.login(req.body);
            return res.status(200).json({ message: "Login successful", ...result });
        } catch (_error) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }

    async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await this.userService.getProfile(userId);
            return res.status(200).json({ data: user });
        } catch (_error) {
            return res.status(404).json({ message: "User not found" });
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const result = this.userService.logout(res);
            return res.status(200).json(result);
        } catch (_error) {
            return res.status(500).json({ message: "Logout failed" });
        }
    }
}
