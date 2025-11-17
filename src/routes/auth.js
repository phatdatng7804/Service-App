import * as controllers from "../controllers";

import express from "express";
const routes = express.Router();

routes.post("/register", controllers.register);
routes.post("/verify", controllers.verify);
routes.post("/login", controllers.login);

module.exports = routes;
