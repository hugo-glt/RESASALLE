import type { Request, Response } from "express";
import { RoomService } from "../services/RoomService";
import { BookingService } from "../services/BookingService";

export class RoomController {
    constructor(
        private roomService = new RoomService(),
        private bookingService = new BookingService(),
    ) {}

    async search(req: Request, res: Response) {
        try {
            const filters = {
                buildings: req.query.buildings
                    ? (req.query.buildings as string).split(",")
                    : undefined,
                floors: req.query.floors
                    ? (req.query.floors as string).split(",").map(Number)
                    : undefined,
                capacities_min: req.query.capacities_min
                    ? Number(req.query.capacities_min)
                    : undefined,
                modularities: req.query.modularities
                    ? req.query.modularities === "true"
                    : undefined,
                equipements: req.query.equipements
                    ? (req.query.equipements as string).split(",").map(Number)
                    : undefined,
            };
            const rooms = await this.roomService.search(filters);
            return res.status(200).json({ data: rooms });
        } catch (error) {
            return res.status(400).json({ message: "Search failed", error });
        }
    }

    async getFilterOptions(_req: Request, res: Response) {
        try {
            const options = await this.roomService.getFilterOptions();
            return res.status(200).json({ data: options });
        } catch (error) {
            return res.status(400).json({ message: "Error", error });
        }
    }

    async getTodayBookings(_req: Request, res: Response) {
    try {
        const bookings = await this.bookingService.getTodayBookings();
        return res.status(200).json({ data: bookings });
    } catch (error) {
        return res.status(400).json({ message: "Error", error });
    }
}
}