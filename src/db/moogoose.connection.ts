import mongoose from "mongoose";
import logger from "../utils/logger/logger.util";

const URI = "mongodb://localhost:27017/segementer";

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => logger.info(`Db Conecter`))
  .catch((err) => logger.info(`Db error: ${err}`));

mongoose.set("useFindAndModify", false);

export default mongoose;
