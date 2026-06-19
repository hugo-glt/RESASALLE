import { AppDataSource } from "../database/data-source";
import { Booking } from "../entities/booking";
import { History } from "../entities/history";

export class BookingService {
    async create(data: {
        dates: string;
        timeslotstart: string;
        timeslotend: string;
        subject: string;
        id_rooms: number;
    }, userId: number) {
        // Check if room is already booked
        const existing = await AppDataSource.getRepository(Booking)
            .createQueryBuilder("booking")
            .where("booking.id_rooms = :roomId", { roomId: data.id_rooms })
            .andWhere("booking.dates = :date", { date: data.dates })
            .andWhere("booking.timeslotstart < :end", { end: data.timeslotend })
            .andWhere("booking.timeslotend > :start", { start: data.timeslotstart })
            .getOne();

        if (existing) {
            throw new Error("Room already booked for this time slot");
        }

        // book
        const bookingRepo = AppDataSource.getRepository(Booking);
        const booking = await bookingRepo.save({
            dates: data.dates,
            timeslotstart: data.timeslotstart,
            timeslotend: data.timeslotend,
            subject: data.subject,
            id_rooms: data.id_rooms,
            idUsers: userId,
        });

        // post in history
        await AppDataSource.getRepository(History).save({
            actions: "CREATE",
            status: "CREATE",
            idBooking: booking.idBooking,
        });

        return booking;
    }

    async getTodayBookings() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return AppDataSource.getRepository(Booking).find({
            where: { dates: today },
            relations: { room: true, user: true },
            order: { timeslotstart: "ASC" },
        });
    }

    async getAvailableRooms(date: string, timeslotstart: string, timeslotend: string) {
        const bookedRoomIds = await AppDataSource.getRepository(Booking)
            .createQueryBuilder("booking")
            .select("booking.id_rooms")
            .where("booking.dates = :date", { date })
            .andWhere("booking.timeslotstart < :end", { end: timeslotend })
            .andWhere("booking.timeslotend > :start", { start: timeslotstart })
            .getMany();

        const ids = bookedRoomIds.map((b) => b.id_rooms);

        const query = AppDataSource.getRepository("Room")
            .createQueryBuilder("room")
            .leftJoinAndSelect("room.equipements", "equipement");

        if (ids.length) {
            query.where("room.id_rooms NOT IN (:...ids)", { ids });
        }

        return query.getMany();
    }
}