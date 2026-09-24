import type { Dialect } from "sequelize";

export interface DBConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

export interface Config {
  development: DBConfig;
  // test: DBConfig;
  // production: DBConfig;
}
