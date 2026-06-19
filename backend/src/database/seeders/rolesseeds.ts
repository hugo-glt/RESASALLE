import { AppDataSource } from "../data-source";
import { Role } from "../../entities/roles";

async function seed() {
    await AppDataSource.initialize();

    const repository = AppDataSource.getRepository(Role);

    const role1 = repository.create({
        id_roles: "R1",
        names: "Student",
        });

        const role2 = repository.create({
        id_roles: "R2",
        names: "Teacher",
        });

        const role3 = repository.create({
        id_roles: "R3",
        names: "Admin",
    });
    await repository.save([role1, role2, role3]);
    console.log("Seed for Roles Applied");
    await AppDataSource.destroy();
}

seed().catch(console.error);
