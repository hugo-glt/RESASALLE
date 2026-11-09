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
        if (typeof data?.email !== "string" || typeof data.password !== "string") {
            throw new Error("Invalid user data");
        }

        const existing = await UserRepository.findOne({ where: { email: data.email } });
        if (existing) throw new Error("Email already used");

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
    // temporary console.log to check if the function is called, test purpose only, remove in production
    async login(data: { email: string; password: string }) {
        if (typeof data?.email !== "string" || typeof data?.password !== "string") {
            console.warn("LOGIN: corps invalide (email ou password absent)");
            throw new Error("Invalid credentials");
    }

    const user = await UserRepository.findOne({
        where: { email: data.email },
        relations: { role: true },
    });

    if (!user) {
        console.warn("LOGIN: aucun compte pour l'email", data.email);
        throw new Error("Invalid credentials");
    }

    const ok = await bcrypt.compare(data.password, user.password);
        if (!ok) {
            console.warn("LOGIN: mot de passe incorrect pour", user.email);
            throw new Error("Invalid credentials");
    }

        const token = jwt.sign(
            { id: user.id_users, role: user.role?.names },
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