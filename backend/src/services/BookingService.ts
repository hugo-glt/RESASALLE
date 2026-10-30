import { AppDataSource } from "../database/data-source";
import type { Request, Response } from "express";
import { Booking } from "../entities/booking";
import { History } from "../entities/history";

export class BookingService {
    bookingService: any;
    async create(
    data: {
        dates: string;
        timeslotstart: string;
        timeslotend: string;
        subject: string;
        id_rooms: number;
    },
    userId: number,
  ) {
    if (data.timeslotstart >= data.timeslotend) {
      throw new Error("Invalid time slot: start must be before end");
    }

    // Check if room is already booked
    const existing = await AppDataSource.getRepository(Booking)
      .createQueryBuilder("booking")
      .where("booking.id_rooms = :roomId", { roomId: data.id_rooms })
      .andWhere("booking.dates = :date", { date: data.dates })
      .andWhere("booking.timeslotstart < :end", { end: data.timeslotend })
      .andWhere("booking.timeslotend > :start", { start: data.timeslotstart })
      .getOne();

    if (data.timeslotstart >= data.timeslotend) {
    throw new Error("Invalid time slot: start must be before end");
    
    console.log("conflit trouvé :", existing, "| params :", data);
    }

    // book
    const bookingRepo = AppDataSource.getRepository(Booking);
    const booking = await bookingRepo.save({
      dates: data.dates,
      timeslotstart: data.timeslotstart,
      timeslotend: data.timeslotend,
      subject: data.subject,
      id_rooms: data.id_rooms,
      id_users: userId,
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
    const date = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    return AppDataSource.getRepository(Booking).find({
      where: { dates: date },
      relations: { room: true, user: true },
      order: { timeslotstart: "ASC" },
    });
  }

  async getAvailableRooms(
    date: string,
    timeslotstart: string,
    timeslotend: string,
  ) {
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

  async getByDate(req: Request, res: Response) {
    const date = req.query.date as string | undefined;
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ message: "date=YYYY-MM-DD required" });
    }
    try {
        const bookings = await this.bookingService.getBookingsByDate(date);
        return res.status(200).json({ data: bookings });
    } catch {
        return res.status(400).json({ message: "Error" });
    }
}
}
