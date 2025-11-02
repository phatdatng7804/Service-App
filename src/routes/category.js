import * as controllers from "../controllers";
import {
  verifyToken,
  isAdmin,
  isAdminOrStaff,
} from "../middlewares/handle_admin";
import express from "express";
const routes = express.Router();

routes.use(verifyToken);
routes.get("/getCategory", isAdminOrStaff, controllers.getAllCategories);
routes.post("/createCategory", isAdmin, controllers.createCategory);
routes.put("/updateCategory/:id", isAdmin, controllers.updateCategory);
routes.delete("/deleteCategory/:id", isAdmin, controllers.deleteCategory);

module.exports = routes;
