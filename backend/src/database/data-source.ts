import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "",
    database: "resasalledb",
    entities: ["src/entity/*.ts"],
    migrations: ["src/migrations/*.ts"],
    synchronize: false,
    logging: true,
});