import { Router } from "express";
import { index, show, orderProducts, create } from "../../handlers/Order";
import auth from "../../middlewares/auth";

const orderRoutes = Router();

orderRoutes.post("/", create);
orderRoutes.get("/", index);
orderRoutes.get("/:id", show);
orderRoutes.get("/:id/products", orderProducts);

export default orderRoutes;
