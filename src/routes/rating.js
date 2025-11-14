import * as controllers from "../controllers";
import { verifyToken, authorizeRoles } from "../middlewares/handle_staff";
import express from "express";
const routes = express.Router();

routes.use(verifyToken);
routes.get("/get-staff", authorizeRoles(2), controllers.getAllRatingStaffs);
routes.post("/create", authorizeRoles(1, 2, 3), controllers.createRatings);

module.exports = routes;
