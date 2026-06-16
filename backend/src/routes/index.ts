import { Router } from "express";
import { UserController } from "../controller/indexController";

const routes = Router();
const userController = new UserController();

routes.get("/", (req, res) => res.json({ message: "API ready" }));
routes.post("/register", userController.register);
routes.post("/login", userController.login);

export default routes;