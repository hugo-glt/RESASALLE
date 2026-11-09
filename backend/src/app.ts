import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { env } from "./config/env";
import { AppDataSource } from "./database/data-source";
import routes from "./routes";

const app = express();

app.use(cors({ origin: env.frontUrl, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

console.log("BOOT backend from:", __dirname); // Remove this line in production, here for test purposes only

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        app.listen(env.port, () => {
            console.log(`Serveur démarré sur http://localhost:${env.port}`);
        });
    })
    .catch((error) => console.error("Error", error));
