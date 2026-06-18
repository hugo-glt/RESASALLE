import { AppDataSource } from "../data-source";
import { User } from "../../entities/users";

async function seed() {
    await AppDataSource.initialize();

    const repository = AppDataSource.getRepository(User);

    const SuperAdmin = repository.create({
        firstname: "SuperAdmin",
        password: "SuperPassword",
        email: "super@mail.com",
        id_roles: "R3",

    });
    await repository.save([SuperAdmin]);
    console.log("Seed for User Super Admin Applied");
    await AppDataSource.destroy();
}

seed().catch(console.error);