import client from "../src/database";
import fs from "fs";

const seedQueries = fs.readFileSync("database/seed.sql", {
  encoding: "utf-8",
});

const seed = async () => {
  try {
    const conn = await client.connect();
    console.log("Running SQL SEEDS");
    await conn.query(seedQueries);
    conn.release();
  } catch (err) {
    throw new Error(`Something Went Wrong ${err}`);
  }
};
seed();
