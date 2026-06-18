import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    async register(data: { users_firstname: string; users_familyname: string; users_email: string; users_password: string }) {
        const hashedPassword = await bcrypt.hash(data.users_password, 10);
        return UserRepository.save({ ...data, users_password: hashedPassword });
    }

    async login(data: { users_email: string; users_password: string }) {
        const user = await UserRepository.findOneBy({ users_email: data.users_email });
        if (!user) throw new Error("Invalid credentials");
        const valid = await bcrypt.compare(data.users_password, user.users_password);
        if (!valid) throw new Error("Invalid credentials");
        const token = jwt.sign({ id: user.idUsers, users_email: user.users_email }, env.jwtSecret!, { expiresIn: "1h" });
        return { token, user };
    }
}
