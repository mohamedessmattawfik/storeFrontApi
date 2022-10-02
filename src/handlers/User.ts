import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User, shopUser } from "../models/User";

dotenv.config();
const shopUsers = new shopUser();

export const create = async (req: Request, res: Response): Promise<void> => {
  const u: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  try {
    const user = await shopUsers.create(u);
    var token = jwt.sign(
      {
        user: user,
      },
      process.env.TOKEN_SECRET!
    );
    res.status(201);
    res.json({
      token: token,
    });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await shopUsers.index();
    res.status(200);
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const user = await shopUsers.show(id);
    res.status(202);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
