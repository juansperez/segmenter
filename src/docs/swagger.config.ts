import swaggerJsdoc from "swagger-jsdoc";
import { resolve } from "path";

const options = {
  // List of files to be processed.
  apis: [resolve(__dirname, "../controllers/**/*.js")],
  // You can also set globs for your apis
  // e.g. './routes/*.js'
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Magneto node core",
      version: "1.0.0",
      description: "Magneto node core v1.0.0",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
};

const specs = swaggerJsdoc(options);

export default specs;
