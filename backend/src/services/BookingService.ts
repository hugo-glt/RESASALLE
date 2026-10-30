import { AppDataSource } from "../database/data-source";
import { Booking } from "../entities/booking";
import { History } from "../entities/history";

export class BookingService {
  async create(
    data: {
      dates: string;
      timeslotstart: string;
      timeslotend: string;
      subject: string;
      id_rooms: number;
    },
    userId: number,
  ): Promise<Booking> {
    const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
    const DATE = /^\d{4}-\d{2}-\d{2}$/;

    if (
      typeof data?.dates !== "string" || !DATE.test(data.dates) ||
      typeof data.timeslotstart !== "string" || !TIME.test(data.timeslotstart) ||
      typeof data.timeslotend !== "string" || !TIME.test(data.timeslotend) ||
      typeof data.subject !== "string" || data.subject.trim() === "" || data.subject.length > 100 ||
      !Number.isInteger(data.id_rooms)
    ) {
      throw new Error("Invalid booking data");
    }

    if (data.timeslotstart >= data.timeslotend) {
      throw new Error("Invalid time slot: start must be before end");
    }

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

    const booking = await AppDataSource.getRepository(Booking).save({
      dates: data.dates,
      timeslotstart: data.timeslotstart,
      timeslotend: data.timeslotend,
      subject: data.subject,
      id_rooms: data.id_rooms,
      id_users: userId,
    });

    await AppDataSource.getRepository(History).save({
      actions: "CREATE",
      status: "CREATE",
      idBooking: booking.idBooking,
    });

    return booking;
  }

  async getAvailableRooms(
    date: string,
    timeslotstart: string,
    timeslotend: string,
  ) {
    // inchangé
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

  async getBookingsByDate(date: string) {
    return AppDataSource.getRepository(Booking)
      .createQueryBuilder("booking")
      .leftJoinAndSelect("booking.room", "room")
      .leftJoin("booking.user", "user")
      .addSelect(["user.id_users", "user.firstname"]) // jamais le password
      .where("booking.dates = :date", { date })
      .orderBy("booking.timeslotstart", "ASC")
      .getMany();
  }
}