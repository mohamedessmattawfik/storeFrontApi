import { Router } from "express";
import { index, show, orderProducts, create } from "../../handlers/Order";
import auth from "../../middlewares/auth";

const orderRoutes = Router();

orderRoutes.post("/", auth, create);
orderRoutes.get("/", auth, index);
orderRoutes.get("/:id", auth, show);
orderRoutes.get("/:id/products", auth, orderProducts);

export default orderRoutes;
