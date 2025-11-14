import * as controllers from "../controllers";
import { verifyToken, isAdmin } from "../middlewares/handle_admin";
import express from "express";
const routes = express.Router();

routes.use(verifyToken);
routes.get("/get-rate", isAdmin, controllers.getAllRatingAdmins);
export default routes;
