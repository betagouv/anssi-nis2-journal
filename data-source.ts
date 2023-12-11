import "reflect-metadata"
import { DataSource } from "typeorm"
import * as process from "process"
import dotenv from "dotenv"

dotenv.config({ path: '.env' });

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.URL_SERVEUR_BASE_DONNEES,
    // schema: nomsEntites.schemas,
    logging: false,
    entities: [],
    migrations: [__dirname + "/migrations/*.ts"],
    subscribers: [],
})
