import user from "./user.js";
import auth from "./auth.js";
import category from "./category.js";
import service from "./service.js";
import adminUser from "./adminUser.js";
import booking from "./booking.js";
import rating from "./rating.js";
import adminRating from "./adminRating.js";
import { notFound } from "../middlewares/handle_error";

const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/category", category);
  app.use("/api/v1/service", service);
  app.use("/api/v1/admin-user", adminUser);
  app.use("/api/v1/booking", booking);
  app.use("/api/v1/rating", rating);
  app.use("/api/v1/admin-rating", adminRating);
  app.use(notFound);
};
module.exports = initRoutes;
