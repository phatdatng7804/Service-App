import * as controllers from "../controllers";

import express from "express";
const routes = express.Router();

routes.get("/getCategory", controllers.getAllCategories);
routes.post("/createCategory", controllers.createCategory);
routes.put("/updateCategory/:id", controllers.updateCategory);
routes.delete("/deleteCategory/:id", controllers.deleteCategory);

module.exports = routes;
