import user from "./user";
import auth from "./auth";
import { notFound } from "../middlewares/handle_error";
const initRoutes = (app) => {
  app.use("/api/v1/user", user);
  app.use("/api/v1/auth", auth);

  app.use(notFound);
};
module.exports = initRoutes;
