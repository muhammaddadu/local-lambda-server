import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import createExpressHandleLambdaHandler from "./functions/createExpressHandleLambdaHandler";

export class LocalLambdaServer {
  app: Express = express();
  port: string | number;

  constructor() {
    this.app.use(cors());
    this.app.use(bodyParser.text());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.get("/", (_, res) => {
      res.status(200).send("Hello World");
    });
  }

  public listen(port = process.env.PORT || 3000) {
    this.port = port;
    this.app.listen(port, ((err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`server is listening on ${this.port}`);
    }) as any);
  }

  public attachLambda(path, handlerFn) {
    this.app.use(path, createExpressHandleLambdaHandler(handlerFn, path));
  }
}
