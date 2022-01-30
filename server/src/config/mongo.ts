import mongoose from "mongoose";
import log4js from "log4js";

const logger = log4js.getLogger("mongo");

mongoose.connect(process.env.MONGO_URI || "", () => {
  logger.info("Connected to MongoDB");
});
