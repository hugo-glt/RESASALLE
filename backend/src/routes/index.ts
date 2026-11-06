import { Router } from "express";
import { UserController } from "../controller/UserController";
import { RoomController } from "../controller/RoomController";
import { BookingController } from "../controller/BookingController";
import { authenticate } from "../middleware/authentificate";

const requireRole = (...roles: string[]) =>
  (req: any, res: any, next: any) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

const routes = Router();
const userController = new UserController();
const roomController = new RoomController();
const bookingController = new BookingController();

routes.get("/", (_req, res) => res.json({ message: "API ready" }));

// auth
routes.post("/login", (req, res) => userController.login(req, res));
routes.post("/logout", (req, res) => userController.logout(req, res));
routes.get("/me", authenticate, (req, res) =>
  userController.getProfile(req, res),
);
routes.post("/register", authenticate, requireRole("Admin"), (req, res) =>
  userController.register(req, res),
);

// rooms
routes.get("/rooms/search", authenticate, (req, res) =>
  roomController.search(req, res),
);
routes.get("/rooms/filters", authenticate, (req, res) =>
  roomController.getFilterOptions(req, res),
);

// bookings
routes.get("/bookings", authenticate, (req, res) =>
  bookingController.getByDate(req, res),
);
routes.get("/bookings/available", authenticate, (req, res) =>
  bookingController.getAvailableRooms(req, res),
);
routes.post(
  "/bookings",
  authenticate,
  requireRole("Teacher", "Admin"),
  (req, res) => bookingController.create(req, res),
);

export default routes;
