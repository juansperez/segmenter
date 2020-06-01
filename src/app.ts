import express from "express";
import log from "./utils/logger/logger.util";
import { createExpressServer } from "routing-controllers";
import { resolve, join } from "path";
import "reflect-metadata";

const app: express.Application = createExpressServer({
  classTransformer: true,
  validation: true,
  cors: true,
  controllers: [resolve(__dirname, "./controllers/**/*{.ts,.js}")], // we specify controllers we want to use
  middlewares: [resolve(__dirname, "./middlewares/**/*{.ts,.js}")], // we specify middlewares we want to use
});

app.use("/video_originals", express.static(join(__dirname + "/../data")));
app.use("/videos", express.static(join(__dirname + "/../data/converteds")));

export default app;
