import dotenv from "dotenv";
import { Pool } from "pg";

// Loading .env file into process.env
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

const client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default client;
