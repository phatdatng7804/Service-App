import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/handle_staff";
const routes = express.Router();

routes.use(verifyToken);
routes.post("/register", controllers.registerDeviceTokens);
routes.post("/send", controllers.sendNotification);
module.exports = routes;
