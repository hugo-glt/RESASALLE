import { Router } from "express";
import { UserController } from "../controller/indexController";
import { authenticate } from "../middleware/authentificate";

const routes = Router();
const userController = new UserController();

routes.get("/", (_req, res) => res.json({ message: "API ready" }));
routes.post("/register", userController.register);
routes.post("/login", userController.login);
routes.post("/logout", userController.logout);
routes.get("/me", authenticate, userController.getProfile);

export default routes;
