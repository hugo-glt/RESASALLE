import type { Request, Response } from "express";
import { UserService } from "../services/UserService";
// or UserController.ts, need change

export class UserController {
    constructor(private userService = new UserService()) {}

    async register(req: Request, res: Response) {
        try {
            const user = await (
                this.userService as unknown as {
                    register: (body: Request["body"]) => Promise<unknown>;
                }
            ).register(req.body);
            return res.status(201).json({ message: "Created", data: user });
        } catch (error) {
            console.log("ERREUR REGISTER:", error);
            return res.status(400).json({ message: "Error", error: error instanceof Error ? error.message : error });
        }
    }

    async login(req: Request, res: Response) {
    try {
        const { token, user } = await this.userService.login(req.body);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 8,
        });

        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("LOGIN ERROR:", error);
        return res.status(401).json({ message: "Invalid credentials" });
    }
}

    async getProfile(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const user = await this.userService.getProfile(userId);
            const safeUser = user;
            return res.status(200).json({ data: safeUser });
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
