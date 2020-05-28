import { createExpressServer } from "routing-controllers";
import { resolve } from "path";
import "reflect-metadata";

export const app = createExpressServer({
  classTransformer: true,
  validation: true,
  controllers: [resolve(__dirname, "../controllers/**/*.ts")], // we specify controllers we want to use
  middlewares: [resolve(__dirname, "../middlewares/**/*.ts")], // we specify middlewares we want to use
}).listen(3000, () => {});
