import * as controllers from "../controllers";
import express from "express";
import { verifyToken, authorizeRoles } from "../middlewares/handle_staff";

const routes = express.Router();

routes.use(verifyToken);
routes.get("/get-all", authorizeRoles(2, 3), controllers.getAllFavorites);
routes.post("/create", authorizeRoles(2, 3), controllers.addFavorites);
routes.delete("/delete/:id", authorizeRoles(2, 3), controllers.removeFavorites);
module.exports = routes;
