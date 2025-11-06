import user from "./user";
import auth from "./auth";
import category from "./category";
import service from "./service";
import adminUser from "./adminUser";
import booking from "./booking";
import { notFound } from "../middlewares/handle_error";
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);
  app.use("/api/v1/category", category);
  app.use("/api/v1/service", service);
  app.use("/api/v1/adminUser", adminUser);
  app.use("/api/v1/booking", booking);
  app.use(notFound);
};
module.exports = initRoutes;
