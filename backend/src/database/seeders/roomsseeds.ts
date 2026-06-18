import { AppDataSource } from "../data-source";
import { Room } from "../../entities/rooms";

async function seed() {
    await AppDataSource.initialize();

    const repository = AppDataSource.getRepository(Room);

    const room1 = repository.create({
        numbers: 10,
        floors: 1,
        buildings: "Alpha",
        modularities: true,
        capacities: 30,
    });
    
    const room2 = repository.create({
        numbers: 22,
        floors: 2,
        buildings: "Beta",
        modularities: false,
        capacities: 50,
    });

    const room3 = repository.create({
        numbers: 33,
        floors: 0,
        buildings: "Gamma",
        modularities: false,
        capacities: 150,
    });

    await repository.save([room1, room2, room3]);
    console.log("Seed for Rooms Applied");
    await AppDataSource.destroy();
}

seed().catch(console.error);