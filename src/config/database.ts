import type { Config } from "./database.types.ts";
import { Sequelize } from "sequelize";
import logger from "#config/logger.js";

const config: Config = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
  },
};

export const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password ?? "", {
  host: config.development.host,
  port: config.development.port,
  dialect: config.development.dialect,
  logging: (msg) => logger.debug(msg),
});

export async function connectDB(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info(`Database connected: ${config.development.database}@${config.development.host}:${config.development.port}`);
  } catch (error) {
    logger.error("Unable to connect to the database", { error });
    throw error;
  }
}

