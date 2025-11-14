import * as controllers from "../controllers";
import {
  verifyToken,
  isAdmin,
  isAdminOrStaff,
} from "../middlewares/handle_admin";
import express from "express";
const routes = express.Router();

routes.use(verifyToken);
routes.get("/get-all", isAdminOrStaff, controllers.getAllCategories);
routes.post("/create", isAdmin, controllers.createCategory);
routes.put("/update/:id", isAdmin, controllers.updateCategory);
routes.delete("/delete/:id", isAdmin, controllers.deleteCategory);

module.exports = routes;
