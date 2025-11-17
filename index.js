import express from "express";
import cors from "cors";
import initRoutes from "./src/routes/index.js";
import { swaggerDocs } from "./src/config/swagger.js";
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: ["https://phatdat.store", "http://localhost:5000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

swaggerDocs(app);

initRoutes(app);

const PORT = process.env.PORT || 3000;

const listener = app.listen(PORT, () => {
  console.log(`Server is running on port ${listener.address().port}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
