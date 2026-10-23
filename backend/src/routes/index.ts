import { Router } from "express";
import { UserController } from "../controller/indexController";
import { authenticate } from "../middleware/authentificate";
import { RoomController } from "../controller/RoomController";
import { BookingController } from "../controller/BookingController";

const routes = Router();
const userController = new UserController();
const roomController = new RoomController();
const bookingController = new BookingController();

//users for logs
routes.get("/", (_req, res) => res.json({ message: "API ready" }));
routes.post("/register", (req, res) => userController.register(req, res));
routes.post("/login", (req, res) => userController.login(req, res));
routes.post("/logout", userController.logout);
routes.get("/me", authenticate, userController.getProfile);
//rooms search
routes.get("/rooms/search", authenticate, roomController.search);
routes.get("/rooms/filters", authenticate, roomController.getFilterOptions);
// booking feature
routes.post(
  "/bookings",
  authenticate,
  bookingController.create,
  requireRole("user"),
);
routes.get(
  "/bookings/available",
  authenticate,
  bookingController.getAvailableRooms,
);
// booked room feed
routes.get("/bookings/today", authenticate, roomController.getTodayBookings);
routes.post(
  "/bookings",
  authenticate,
  requireRole("Teacher", "Admin"),
  (req, res) => bookingController.create(req, res),
);
routes.post("/register", authenticate, requireRole("Admin"), (req, res) =>
  userController.register(req, res),
);

export default routes;
function requireRole(
  ...roles: string[]
): import("express-serve-static-core").RequestHandler<
  import("express-serve-static-core").ParamsDictionary,
  any,
  any,
  import("qs").ParsedQs,
  Record<string, any>
> {
  return (req, res, next) => {
    const user = (req as typeof req & { user?: { role?: string } }).user;

    if (!user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    if (!user.role || !roles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    next();
  };
}
