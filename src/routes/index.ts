import { Router } from "express";
import userRoutes from "./api/userRoutes";

const routes = Router();

routes.use("/users", userRoutes);

export default routes;
