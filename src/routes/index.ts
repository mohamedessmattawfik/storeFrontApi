import { Router } from "express";
import userRoutes from "./api/userRoutes";
import productRoutes from "./api/productRoutes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/products", productRoutes);

export default routes;
