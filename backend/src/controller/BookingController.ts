import type { Request, Response } from "express";
import { BookingService } from "../services/BookingService";

export class BookingController {
    constructor(private bookingService = new BookingService()) {}

    async create(req: Request, res: Response) {
        try {
            const userId = (req as any).user.id;
            const booking = await this.bookingService.create(req.body, userId);
            return res.status(201).json({ message: "Booking created", data: booking });
        } catch (error: any) {
            const status = error.message.includes("already booked") ? 409 : 400;
            return res.status(status).json({ message: error.message });
        }
    }

    async getAvailableRooms(req: Request, res: Response) {
        try {
            const { date, timeslotstart, timeslotend } = req.query as any;
            if (!date || !timeslotstart || !timeslotend) {
                return res.status(400).json({ message: "Missing filters" });
            }
            const rooms = await this.bookingService.getAvailableRooms(date, timeslotstart, timeslotend);
            return res.status(200).json({ data: rooms });
        } catch (error) {
            return res.status(400).json({ message: "Error", error });
        }
    }
}