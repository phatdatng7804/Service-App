import * as controllers from "../controllers";
import express from "express";
import {
  verifyToken,
  isStaff,
  isAdminOrStaff,
  isStaffOrCustomer,
} from "../middlewares/handle_staff";

const routes = express.Router();

routes.use(verifyToken);

routes.get("/getBooking", isAdminOrStaff, controllers.getAllBookings);
routes.post("/createBooking", isStaffOrCustomer, controllers.createBookings);
routes.put("/updateBooking/:id", isStaffOrCustomer, controllers.updateBookings);
routes.post("/cancel/:id", isStaffOrCustomer, controllers.cancelBookings);
routes.post("/cancel-all", isStaff, controllers.cancelAllBookings);

module.exports = routes;
