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
        date?: string;
        timeslotstart?: string;
        timeslotend?: string;
    }) {
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
        if (filters.capacities_min !== undefined) {
            query.andWhere("room.capacities >= :min", { min: filters.capacities_min });
        }
        if (filters.modularities !== undefined) {
            query.andWhere("room.modularities = :mod", { mod: filters.modularities });
        }

        // Room must have all the requested equipment (AND condition)
        if (filters.equipements?.length) {
            query.andWhere(
                `room.id_rooms IN (
                    SELECT er.id_rooms FROM equipment_room er
                    WHERE er.id_equipements IN (:...equipIds)
                    GROUP BY er.id_rooms
                    HAVING COUNT(DISTINCT er.id_equipements) = :equipCount)`,
                {
                    equipIds: filters.equipements,
                    equipCount: new Set(filters.equipements).size,
                },
            );
        }

        // Exclude rooms that are booked during the specified date and time slot
        if (filters.date && filters.timeslotstart && filters.timeslotend) {
            query.andWhere(
                `NOT EXISTS (
                    SELECT 1 FROM booking b
                    WHERE b.id_rooms = room.id_rooms AND b.dates = :date
                    AND b.time_slot_start < :slotEnd AND b.time_slot_end > :slotStart)`,
                {
                    date: filters.date,
                    slotStart: filters.timeslotstart,
                    slotEnd: filters.timeslotend,
                },
            );
        }

        return query
            .orderBy("room.buildings", "ASC")
            .addOrderBy("room.floors", "ASC")
            .addOrderBy("room.numbers", "ASC")
            .getMany();
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