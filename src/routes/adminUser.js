import * as controllers from "../controllers";
import express from "express";
import { verifyToken, isAdmin } from "../middlewares/handle_admin";
const routes = express.Router();

routes.use(verifyToken, isAdmin);
routes.get("/get-admin", controllers.getAllUsers);
routes.put("/update-admin/:id", controllers.updateUserAd);
routes.delete("/delete-admin/:id", controllers.deleteUser);
routes.patch("/toggle-admin/:id", controllers.toggleUserActiveStatus);
module.exports = routes;
