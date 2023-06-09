import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import postRouter from "../Routes/posts.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const PORT = process.env.PORT || 9000;
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
      termsOfService: "http://example.com/terms/",
      contact: {
        name: "API Support",
        url: "http://www.exmaple.com/support",
        email: "support@example.com",
      },
    },

    servers: [
      {
        url: "http://localhost:9000",
        description: "My Library API Documentation",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsDoc(options);
app.use("/api", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/books", postRouter);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
