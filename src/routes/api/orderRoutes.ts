import { Router } from "express";
import {
  index,
  show,
  orderProducts,
  create,
  addProduct,
} from "../../handlers/Order";
import auth from "../../middlewares/auth";

const orderRoutes = Router();

orderRoutes.post("/", auth, create);
orderRoutes.get("/", index);
orderRoutes.get("/:id", auth, show);
orderRoutes.get("/:id/products", auth, orderProducts);
orderRoutes.post("/:id/products", auth, addProduct);

export default orderRoutes;
