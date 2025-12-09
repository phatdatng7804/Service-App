import * as controllers from "../controllers";
import express from "express";
import { verifyToken } from "../middlewares/handle_staff";
const routes = express.Router();

routes.use(verifyToken);
routes.post("/device-token/register", controllers.registerDeviceTokens);
routes.post("/device-token/send", controllers.sendNotification);
module.exports = routes;
