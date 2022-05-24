import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import Recipes  from "./routes/recipes";

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
  }

  setupControllers() {
    app.use("/api", Recipes);
    app;
  }
}

const application = new Application();

application.listen();
