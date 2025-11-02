import * as controllers from "../controllers";
import express from "express";
import { verifyToken, isAdmin } from "../middlewares/handle_admin";
const routes = express.Router();

routes.use(verifyToken, isAdmin);
routes.get("/getAdminUsers", controllers.getAllUsers);
routes.put("/updateAdminUser/:id", controllers.updateUser);
routes.delete("/deleteAdminUser/:id", controllers.deleteUser);
routes.patch("/toggleAdminUser/:id", controllers.toggleUserActiveStatus);
module.exports = routes;
