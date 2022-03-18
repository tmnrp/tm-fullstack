import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { IUsers, usersModel } from "../models/users.model";
import { bcryptCompare, bcryptHash } from "../utils/bcrypt";
import { Logger } from "../utils/logger";
import {
  CONST_CONFIG_ACCESS_TOKEN_DURATION,
  CONST_CONFIG_PRIVATE_KEY,
  CONST_CONFIG_PUBLIC_KEY,
  CONST_CONFIG_REFRESH_TOKEN_DURATION,
} from "../constants";

//
export const postLogin = async (req: Request, res: Response) => {
  try {
    // get creds from request
    const { username, password: reqPwd } = (req.body as IUsers) || {};

    // fetch matching user using username
    const users = await usersModel.find({ username }).lean();

    if (users.length > 0) {
      // validate password
      const { password = "", ...user } = users[0];
      const isPasswordValid = await bcryptCompare(reqPwd, password);

      if (isPasswordValid) {
        // extract user id
        const userID = user?._id;
        const accessToken = await generateAccessTokenByUserId(
          userID?.toString()
        );

        // generate refresh token
        const refreshToken = jwt.sign({}, CONST_CONFIG_PRIVATE_KEY, {
          algorithm: "RS256",
          expiresIn: CONST_CONFIG_REFRESH_TOKEN_DURATION,
        });

        // return response
        Logger.info(`Login success ${user._id}`);
        return res.status(200).json({
          status: "success",
          items: { accessToken, refreshToken },
        });
      }
    }

    // return failed login
    return res.status(401).json({
      status: "failed",
      message: "Invalid credentials",
    });
  } catch (error: any) {
    Logger.error(error);
  }
};

//
interface IPostRefreshToken {
  accessToken: string;
  refreshToken: string;
}
export const postRefreshToken = async (req: Request, res: Response) => {
  try {
    const { accessToken, refreshToken } = (req.body as IPostRefreshToken) || {};
    jwt.verify(refreshToken, CONST_CONFIG_PUBLIC_KEY);

    //
    const accessTokenInfo: any = jwt.decode(accessToken);
    const newAccessToken = await generateAccessTokenByUserId(
      accessTokenInfo?._id
    );

    //
    return res.status(200).json({
      status: "success",
      newAccessToken,
    });
  } catch (error: any) {
    Logger.error(error);
  }

  //
  return res.status(401).json({
    status: "failed",
    message: "Authentication required",
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

//
export const generateAccessTokenByUserId = async (userID: string) => {
  try {
    const user = await usersModel
      .findById(userID)
      .lean()
      .populate({
        path: "rolesID",
        populate: {
          path: "rightsID",
        },
      });

    //
    const payload = { ...user, password: "" };
    if (payload) {
      const accessToken = jwt.sign(payload, CONST_CONFIG_PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn: CONST_CONFIG_ACCESS_TOKEN_DURATION,
      });

      return accessToken;
    }
  } catch (error: any) {
    Logger.error(error);
  }

  //
  return "";
};
