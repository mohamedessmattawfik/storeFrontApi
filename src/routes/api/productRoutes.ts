import { Router } from "express";
import { create, index, show } from "../../handlers/Product";
import auth from "../../middlewares/auth";

const productRoutes = Router();

productRoutes.post("/", auth, create);
productRoutes.get("/", index);
productRoutes.get("/:id", show);

export default productRoutes;
