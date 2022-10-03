import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products";
      const conn = await client.connect();
      const result = await conn.query(sql);
      const products = result.rows;
      conn.release();
      return products;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id =($1)";
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      const product = result.rows[0];
      return product;
    } catch (err) {
      throw new Error(`Something Went Wrong ${err}`);
    }
  }
}
