import { client } from "./cosmos";

export const database = async () =>
  (await client()).database("default-cosmosdb-sqldb");

export const users = async () =>
  (await database()).container("default-sql-container");
