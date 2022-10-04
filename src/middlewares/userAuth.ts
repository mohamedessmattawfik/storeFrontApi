import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";

dotenv.config();

const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const userID = req.params.id;
  if (authHeader === undefined) {
    res.status(404);
    res.json({
      message: "Invalid Token",
    });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as User;
    if (decoded.id != userID) {
      res.status(401);
      res.json({
        message: "Not Allowed",
      });
      return;
    }
    next();
  } catch (err) {
    res.status(401);
    res.json({
      message: err,
    });
  }
};

export default userAuth;
