import * as controllers from "../controllers";

import express from "express";
const routes = express.Router();

routes.post("/register", controllers.register);
routes.post("/verify", controllers.verify);
routes.post("/login", controllers.login);
routes.post("/forgot-password", controllers.forgot);
routes.post("/verify-reset-otp", controllers.verifyReset);
routes.post("/reset-password", controllers.passReset);
module.exports = routes;
