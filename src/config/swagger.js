import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
require("dotenv").config();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Service Booking API",
      version: "1.0.0",
      description: "API Document",
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/swagger/**/*.js", "./dist/src/swagger/**/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
