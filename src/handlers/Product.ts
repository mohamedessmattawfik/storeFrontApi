import dotenv from "dotenv";
import { Product, ProductStore } from "../models/Product";
import { Request, Response } from "express";

const productStore = new ProductStore();

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await productStore.index();
    res.status(200);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const product: Product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
  };
  try {
    const result = await productStore.create(product);
    res.status(201);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;
  try {
    const product = await productStore.show(id);
    res.status(200);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
