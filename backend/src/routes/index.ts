import { Router } from "express";
import { UserController } from "../controller/indexController";
import { authenticate } from "../middleware/authentificate";
import { RoomController } from "../controller/RoomController";
import { BookingController } from "../controller/BookingController"

const routes = Router();
const userController = new UserController();
const roomController = new RoomController();
const bookingController = new BookingController();

//users for logs
routes.get("/", (_req, res) => res.json({ message: "API ready" }));
routes.post("/register", userController.register);
routes.post("/login", userController.login);
routes.post("/logout", userController.logout);
routes.get("/me", authenticate, userController.getProfile);
//rooms search
routes.get("/rooms/search", authenticate, roomController.search);
routes.get("/rooms/filters", authenticate, roomController.getFilterOptions);    
// booking feature 
routes.post("/bookings", authenticate, bookingController.create);
routes.get("/bookings/available", authenticate, bookingController.getAvailableRooms);
// booked room feed
routes.get("/bookings/today", authenticate, (bookingController as any).getTodayBookings);

export default routes;
