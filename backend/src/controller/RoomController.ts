import type { Request, Response } from "express";
import { RoomService } from "../services/RoomService";
import { TIME_RE, isValidDate } from "../utils/validations";

export class RoomController {
  constructor(private roomService = new RoomService()) {}

  async search(req: Request, res: Response) {
    try {
      const q = req.query;

      // Une valeur de l'URL n'est utilisable que si c'est une chaîne non vide
      const str = (v: unknown): string | undefined =>
        typeof v === "string" && v !== "" ? v : undefined;
      const list = (v: unknown) =>
        str(v)
          ?.split(",")
          .filter((s) => s !== "");
      const numbers = (v: unknown) => list(v)?.map(Number);

      const filters = {
        buildings: list(q.buildings),
        floors: numbers(q.floors),
        capacities_min:
          str(q.capacities_min) !== undefined
            ? Number(q.capacities_min)
            : undefined,
        modularities:
          str(q.modularities) !== undefined
            ? q.modularities === "true"
            : undefined,
        equipements: numbers(q.equipements),
        date: str(q.date),
        timeslotstart: str(q.timeslotstart),
        timeslotend: str(q.timeslotend),
      };

      // Les filtres numériques doivent être des entiers (floors=abc donnerait NaN)
      const nums = [...(filters.floors ?? []), ...(filters.equipements ?? [])];
      if (filters.capacities_min !== undefined)
        nums.push(filters.capacities_min);
      if (nums.some((n) => !Number.isInteger(n))) {
        return res.status(400).json({ message: "Invalid numeric filter" });
      }

      // date, début et fin vont ensemble
      const { date, timeslotstart, timeslotend } = filters;
      if (date || timeslotstart || timeslotend) {
        if (!date || !timeslotstart || !timeslotend) {
          return res
            .status(400)
            .json({
              message: "date, timeslotstart and timeslotend go together",
            });
        }
        if (
          !isValidDate(date) ||
          !TIME_RE.test(timeslotstart) ||
          !TIME_RE.test(timeslotend) ||
          timeslotstart >= timeslotend
        ) {
          return res.status(400).json({ message: "Invalid date or time slot" });
        }
      }

      const rooms = await this.roomService.search(filters);
      return res.status(200).json({ data: rooms });
    } catch (error) {
      console.error("SEARCH ERROR:", error);
      return res.status(400).json({ message: "Search failed" });
    }
  }

  async getFilterOptions(_req: Request, res: Response) {
    try {
      const options = await this.roomService.getFilterOptions();
      return res.status(200).json({ data: options });
    } catch (error) {
      console.error("FILTERS ERROR:", error);
      return res.status(400).json({ message: "Error" });
    }
  }
}
