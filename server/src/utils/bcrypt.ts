import bcrypt from "bcrypt";
import { Logger } from "./logger";

const COSNT_BCRYPT_SALT_ROUNDS = 10;

//
export const bcryptHash = (
  text: string,
  callback: (err: Error | undefined, hash: string) => void
) => {
  return bcrypt.hash(text, COSNT_BCRYPT_SALT_ROUNDS, (error, hash) => {
    error && Logger.error(error);
    hash && Logger.info(hash);

    callback(error, hash);
  });
};

//
export const bcryptCompare = async (text: string, hash: string) => {
  return await bcrypt.compare(text, hash);
};
