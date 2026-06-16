import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

export class UserService {
    async register(data: { firstname: string; familyname: string; email: string; password: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return UserRepository.save({ ...data, password: hashedPassword });
}

    async login(data: { email: string; password: string }) {
    const user = await UserRepository.findOneBy({ email: data.email });
    if (!user) throw new Error("Invalid credentials");
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");
    const token = jwt.sign({ id: user.idUsers, email: user.email }, env.jwtSecret!, { expiresIn: "1h" });
    return { token, user };
}
}