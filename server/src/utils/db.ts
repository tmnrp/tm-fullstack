import { Logger } from "./logger";
import { connect } from "mongoose";
import { CONST_CONFIG_DB_URI } from "../constants";

export const connectDB = () => {
  try {
    connect(CONST_CONFIG_DB_URI, () => {
      Logger.info(`MongoDB connected successfully`);
    });
  } catch (e) {
    Logger.error("==> " + e);
  }
};
