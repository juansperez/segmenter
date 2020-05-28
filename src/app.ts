import express from "express";
import { createExpressServer } from "routing-controllers";
import { resolve } from "path";
import "reflect-metadata";

const app: express.Application = createExpressServer({
  classTransformer: true,
  validation: true,
  controllers: [resolve(__dirname, "./controllers/**/*{.ts,.js}")], // we specify controllers we want to use
  middlewares: [resolve(__dirname, "./middlewares/**/*{.ts,.js}")], // we specify middlewares we want to use
});

export default app;
