import * as controllers from "../controllers";
import {
  verifyToken,
  isStaff,
  isAdminOrStaff,
} from "../middlewares/handle_staff";
import express from "express";
const routes = express.Router();

routes.use(verifyToken);
routes.get("/getService", isAdminOrStaff, controllers.getAllServices);
routes.post("/createService", isStaff, controllers.createService);
routes.put("/updateService/:id", isStaff, controllers.updateService);
routes.delete("/deleteService/:id", isStaff, controllers.deleteService);

module.exports = routes;
