import { Router } from "express";
import { create, index, show, userOrders } from "../../handlers/User";
import auth from "../../middlewares/auth";
import userAuth from "../../middlewares/userAuth";

const userRoutes = Router();

userRoutes.post("/", create);
userRoutes.get("/", auth, index);
userRoutes.get("/:id", auth, show);
userRoutes.get("/:id/orders", userAuth, userOrders);

export default userRoutes;
