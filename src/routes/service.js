import * as controllers from "../controllers";
import { verifyToken, authorizeRoles } from "../middlewares/handle_staff";
import express from "express";
const routes = express.Router();

routes.use(verifyToken);
routes.get("/get-all", authorizeRoles(1, 2, 3), controllers.getAllServices);
routes.get("/get-my-service", authorizeRoles(2), controllers.getMyService);
routes.post("/create", authorizeRoles(2), controllers.createService);
routes.put("/update/:id", authorizeRoles(2), controllers.updateService);
routes.delete("/delete/:id", authorizeRoles(1, 2), controllers.deleteService);

module.exports = routes;
