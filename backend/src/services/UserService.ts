import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    async register(data: {
        firstname: string;
        email: string;
        password: string;
        id_roles: string;
    }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const saved = await UserRepository.save({
            firstname: data.firstname,
            email: data.email,
            password: hashedPassword,
            role: { id_roles: data.id_roles },
        });
        const { password, ...safeUser } = saved;
        return safeUser;
    }

    async login(data: { email: string; password: string }) {
        const user = await UserRepository.findOne({
            where: { email: data.email },
            relations: { role: true },
        });
        if (!user) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(data.password, user.password);
        if (!ok) throw new Error("Invalid credentials");

        const token = jwt.sign(
            { id: user.id_users, role: user.role.names },
            env.jwtSecret,
            { expiresIn: "1h" },
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
        const { password, ...safeUser } = user;
        return safeUser;
    }

    async logout(res: any) {
        res.clearCookie("token");
        return { message: "Logged out successfully" };
    }
}