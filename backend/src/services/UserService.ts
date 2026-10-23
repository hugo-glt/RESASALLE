import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    // supprime la ligne `userService: any;`

    async login(data: { email: string; password: string }) {
        const user = await UserRepository.findOne({
            where: { email: data.email },
            relations: { role: true },
        });
        if (!user) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(data.password, user.password);
        if (!ok) throw new Error("Invalid credentials");

        const jwtSecret = env.jwtSecret;
        if (!jwtSecret) throw new Error("JWT secret is not configured");

        const token = jwt.sign(
            { id: user.id_users, role: user.role.names },
            jwtSecret,
            { expiresIn: "10m" },
        );

        const { password, ...safeUser } = user;
        return { token, user: safeUser };
    }

    async getProfile(userId: number) {
    const user = await UserRepository.findOne({
        where: { id_users: userId },
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
