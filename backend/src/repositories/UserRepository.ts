import { AppDataSource } from "../database/data-source";
import { User } from "../entities/users";

export const UserRepository = AppDataSource.getRepository(User);
