import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { IUsers, usersModel } from "../models/users.model";
import { bcryptCompare, bcryptHash } from "../utils/bcrypt";
import { Logger } from "../utils/logger";
import { CONST_CONFIG_PRIVATE_KEY } from "../constants";

//
export const postLogin = async (req: Request, res: Response) => {
  try {
    const { username, password: reqPwd } = (req.body as IUsers) || {};
    const users = await usersModel
      .find({ username })
      .lean()
      .populate("rolesID");

    //
    if (users.length > 0) {
      const { password = "", ...user } = users[0];
      const isPasswordValid = await bcryptCompare(reqPwd, password);

      //
      if (isPasswordValid) {
        const accessToken = jwt.sign(user, CONST_CONFIG_PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: "5m",
        });
        const refreshToken = jwt.sign({}, accessToken, {
          expiresIn: "10m",
        });

        //
        Logger.info(`Login success ${user._id}`);
        return res.status(200).json({
          status: "success",
          message: { accessToken, refreshToken },
        });
      }
    }
  } catch (error: any) {
    Logger.error(error);
  }

  //
  return res.status(401).json({
    status: "failed",
    message: "Invalid credentials",
  });
};

//
export const insertSuper = (req: Request, res: Response) => {
  const { username, password } = { username: "root", password: "root" };

  bcryptHash(password, async (error, hash) => {
    if (error) throw error;

    //
    try {
      const result = await usersModel.create({
        username: username,
        password: hash,
      });
      Logger.info(result);
      return res.status(201).json({
        status: "success",
        message: `Successfully created super`,
      });
    } catch (error) {
      Logger.error(error);
      return res.status(500).json({
        success: "failed",
        message: "Error inserting super",
      });
    }
  });
};
