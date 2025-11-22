import * as controllers from "../controllers";
import express from "express";
import { authorizeRoles, verifyToken } from "../middlewares/handle_staff";
import upload from "../middlewares/upload";
const routes = express.Router();
routes.use(verifyToken);
routes.put(
  "/upload",
  authorizeRoles(1, 2, 3),
  upload.single("avatar"),
  controllers.uploadFiles
);
routes.put("/update-user", authorizeRoles(1, 2, 3), controllers.updateUser);
module.exports = routes;
