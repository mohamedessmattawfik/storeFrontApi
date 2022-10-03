import client from "../database";
import { Product } from "./Product";

export type Order = {
  id?: string;
  user_id: string;
  status: string;
};

export class Cart {
  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders ";
      const conn = await client.connect();
      const result = await conn.query(sql);
      const orders = result.rows;
      conn.release();
      return orders;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      return order;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }

  async addProduct(
    productId: string,
    orderId: string,
    quantity: number
  ): Promise<Order> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const res = await conn.query(sql, [quantity, orderId, productId]);
      const result = res.rows[0];
      return result;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }

  async orderProducts(orderId: string): Promise<Product[]> {
    try {
      const sql =
        "SELECT name, price FROM products INNER JOIN order_products ON ($1) = order_products.order_id";
      const conn = await client.connect();
      const result = await conn.query(sql, [orderId]);
      const products = result.rows;
      return products;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }
}
