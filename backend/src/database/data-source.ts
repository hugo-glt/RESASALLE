import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "resasalledb2",
    entities: ["src/entities/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    synchronize: false,
    logging: true,
});
