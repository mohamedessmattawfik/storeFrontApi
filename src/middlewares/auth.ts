import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    res.status(404);
    res.json({
      message: "Invalid Token",
    });
    return;
  }
  const token = authHeader!.split(" ")[1];
  try {
    jwt.verify(token, process.env.TOKEN_SECRET!);
    next();
  } catch (err) {
    res.json({
      message: `Invalid Token ${err}`,
    });
  }
};

export default auth;
