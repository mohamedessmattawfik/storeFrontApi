import client from "../database";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const saltRounds = process.env.SALT_ROUNDS!;
const pepper = process.env.BCRYPT_PASSWORD;

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  password: string;
};

export class shopUser {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const res = await conn.query(sql);
      conn.release();
      const users = res.rows;
      return users;
    } catch (err) {
      throw new Error(`Something Went Wrong`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const res = await conn.query(sql, [u.firstName, u.lastName, hash]);
      conn.release();
      const user = res.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const res = await conn.query(sql, [id]);
      conn.release();
      const user = res.rows[0];
      return user;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }
}