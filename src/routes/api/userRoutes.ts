import { Router } from "express";
import { create, index, show } from "../../handlers/User";
import auth from "../../middlewares/auth";

const userRoutes = Router();

userRoutes.post("/", create);
userRoutes.get("/", index);
userRoutes.get("/:id", auth, show);

export default userRoutes;
