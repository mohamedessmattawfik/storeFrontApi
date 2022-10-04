import { Order, Cart } from "../models/Order";
import { Request, Response } from "express";
import { Product } from "../models/Product";

const shoppingCart = new Cart();

export const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await shoppingCart.index();
    res.status(200);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = req.body;
    const result = await shoppingCart.create(order);
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
    const order = await shoppingCart.show(id);
    res.status(200);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export const orderProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orderId = req.params.id;
    const products = await shoppingCart.orderProducts(orderId);
    res.status(200);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const orderId = req.params.id;
    const result = await shoppingCart.addProduct(productId, orderId, quantity);
    res.status(201);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
