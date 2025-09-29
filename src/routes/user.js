const routes = require("express").Router();
const user = require("../controllers/user");

routes.get("/", user.getUser);

module.exports = routes;
