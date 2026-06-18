import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    async register(data: { firstname: string; familyname: string; email: string; password: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return UserRepository.save({ ...data, password: hashedPassword });
    }

    async login(data: { email: string; password: string }) {
        const user = await UserRepository.findOne({
            where: { email: data.email },
            relations: { role: true },   // ← charge la relation Role
        });
        if (!user) throw new Error("Invalid credentials");
        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new Error("Invalid credentials");
        const token = jwt.sign(
            { id: user.idUsers, email: user.email, role: user.role?.names },
            env.jwtSecret!,
            { expiresIn: "1h" },
        );
        return { token, user };
    }

    async getProfile(userId: number) {
        const user = await UserRepository.findOne({
            where: { idUsers: userId },
            relations: { role: true },
        });
        if (!user) throw new Error("User not found");
        return user;
    }
    
    async logout(res: any) {
        res.clearCookie("token");
        return { message: "Logged out successfully" };
    }
}
