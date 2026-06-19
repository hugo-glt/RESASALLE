import { AppDataSource } from "../data-source";
import { Equipement } from "../../entities/equipements";

async function seed() {
    await AppDataSource.initialize();

    const repository = AppDataSource.getRepository(Equipement);

    const epi1 = repository.create({
        serial: 12345,
        disponibilities: true,
        description: "Screen Board",
        });

        const epi2 = repository.create({
        serial: 23456,
        disponibilities: false,
        description: "Computer",
        });

        const epi3 = repository.create({
        serial: 34567,
        disponibilities: true,
        description: "Server Rack",
    });
    await repository.save([epi1, epi2, epi3]);
    console.log("Seed for Equipement Applied");
    await AppDataSource.destroy();
}

seed().catch(console.error);
