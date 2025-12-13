import * as controllers from "../controllers";
import express from "express";
import { verifyToken, authorizeRoles } from "../middlewares/handle_staff";
const routes = express.Router();

routes.use(verifyToken);
routes.put("/profile", authorizeRoles(2), controllers.updateMyStaffProfiles);
module.exports = routes;
