import * as controllers from "../controllers";

import express from "express";
const routes = express.Router();

routes.get("/getService", controllers.getAllServices);
routes.post("/createService", controllers.createService);
routes.put("/updateService/:id", controllers.updateService);
routes.delete("/deleteService/:id", controllers.deleteService);

module.exports = routes;
