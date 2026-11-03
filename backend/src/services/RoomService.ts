import { AppDataSource } from "../database/data-source";
import { Room } from "../entities/rooms";
import { Equipement } from "../entities/equipements";

export class RoomService {
    async search(filters: {
        buildings?: string[];  
        floors?: number[];        
        capacities_min?: number;
        modularities?: boolean;     
        equipements?: number[];     
    }) 
    
    { // filter for room research
        const query = AppDataSource.getRepository(Room)
            .createQueryBuilder("room")
            .leftJoinAndSelect("room.equipements", "equipement")
            .leftJoinAndSelect("room.disponibility", "disponibility");

        if (filters.buildings?.length) {
            query.andWhere("room.buildings IN (:...buildings)", { buildings: filters.buildings });
        }
        if (filters.floors?.length) {
            query.andWhere("room.floors IN (:...floors)", { floors: filters.floors });
        }
        if (filters.capacities_min) {
            query.andWhere("room.capacities >= :min", { min: filters.capacities_min });
        }
        if (filters.modularities !== undefined) {
            query.andWhere("room.modularities = :mod", { mod: filters.modularities });
        }
        if (filters.equipements?.length) {
            query.andWhere("equipement.idEquipements IN (:...equipements)", {
                equipements: filters.equipements,
            });
        }

        return query.getMany();
    }

    async getFilterOptions() {
        const roomRepo = AppDataSource.getRepository(Room);
        const distinct = (column: "buildings" | "floors" | "capacities") =>
            roomRepo
                .createQueryBuilder("room")
                .select(`room.${column}`, "value")
                .distinct(true)
                .orderBy(`room.${column}`, "ASC")
                .getRawMany<{ value: string | number }>();

        const [buildings, floors, capacities, equipements] = await Promise.all([
            distinct("buildings"),
            distinct("floors"),
            distinct("capacities"),
            AppDataSource.getRepository(Equipement).find({
                select: { idEquipements: true, description: true },
                order: { description: "ASC" },
            }),
        ]);

        return {
            buildings: buildings.map((building) => String(building.value)),
            floors: floors.map((floor) => Number(floor.value)),
            capacities: capacities.map((capacity) => Number(capacity.value)),
            equipements: equipements.map((equipement) => ({
                id: equipement.idEquipements,
                name: equipement.description,
            })),
        };
    }
}