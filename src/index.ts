import Server from "./server/server";
import "./config";
import logger from "./utils/logger/logger.util";

export const server = Server.init((process.env.PORT as unknown) as number);

server.start(() =>
  logger.info(`Server is running at PORT: ${process.env.PORT}`)
);
