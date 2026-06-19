import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(env.port, () => {
            console.log(`Serveur démarré sur http://localhost:${env.port}`);
        });
    })
    .catch((error) => console.error("Error", error));
