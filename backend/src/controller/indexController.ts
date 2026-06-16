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
    } catch (error) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
}
}  