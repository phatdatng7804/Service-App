import * as controllers from "../controllers";
import express from "express";
import { verifyToken, authorizeRoles } from "../middlewares/handle_staff";

const routes = express.Router();

routes.use(verifyToken);

routes.get("/get-all", authorizeRoles(1, 2, 3), controllers.getAllBookings);
routes.post("/create", authorizeRoles(2, 3), controllers.createBookings);
routes.put("/update/:id", authorizeRoles(2, 3), controllers.updateBookings);
routes.post("/cancel/:id", authorizeRoles(2, 3), controllers.cancelBookings);
routes.post("/cancel-all", authorizeRoles(2), controllers.cancelAllBookings);
routes.get("/history", authorizeRoles(1, 2, 3), controllers.getHistoryBookings);
module.exports = routes;
