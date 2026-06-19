import { AppDataSource } from "../database/data-source";
import { Room } from "../entities/rooms";

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
        const buildings = await AppDataSource.query(
            "SELECT DISTINCT buildings FROM Rooms ORDER BY buildings"
        );
        const floors = await AppDataSource.query(
            "SELECT DISTINCT floors FROM Rooms ORDER BY floors"
        );
        const equipements = await AppDataSource.query(
            "SELECT idEquipements, description FROM Equipements"
        );
        return { buildings, floors, equipements };
    }
}