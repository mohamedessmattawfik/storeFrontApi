import { Router } from "express";
import { index, show, orderProducts } from "../../handlers/Order";
import auth from "../../middlewares/auth";

const orderRoutes = Router();

// orderRoutes.post("/", auth, create);
orderRoutes.get("/", index);
orderRoutes.get("/:id", show);
orderRoutes.get("/:id/products", orderProducts);

export default orderRoutes;
