import dotenv from "dotenv";
import { resolve } from "path";
dotenv.config();
import "./src/database";
import express from "express";
import homeRoutes from "./src/routes/homeRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import tokenRoutes from "./src/routes/tokenRoutes.js";
import studentRoutes from "./src/routes/studentRoutes.js";
import photoRoutes from "./src/routes/photoRoutes.js";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, "upload")));
  }
  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/students", studentRoutes);
    this.app.use("/users", userRoutes);
    this.app.use("/token", tokenRoutes);
    this.app.use("/photos", photoRoutes);
  }
}

export default new App().app;
