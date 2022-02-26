import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { IUsers, usersModel } from "../models/users.model";
import { rolesModel } from "../models/roles.model";
import { bcryptCompare, bcryptHash } from "../utils/bcrypt";
import { Logger } from "../utils/logger";
import { CONST_CONFIG_PRIVATE_KEY } from "../constants";

//
export const postLogin = async (req: Request, res: Response) => {
  const { username, password } = (req.body as IUsers) || {};

  try {
    const users = await usersModel.find({ username });
    //
    if (users.length > 0 && users[0].password && password) {
      const isPasswordValid = await bcryptCompare(password, users[0].password);

      if (isPasswordValid) {
        const user = users[0];

        //
        const userRoles =
          user._id && (await rolesModel.find({ userID: user._id.toString() }));

        //
        let tokenDetails = {};
        tokenDetails = userRoles
          ? { ...tokenDetails, userRoles: userRoles }
          : tokenDetails;
        const accessToken = generateAccessToken(tokenDetails);

        //
        return res.status(200).json({
          status: "success",
          accessToken,
        });
      } else Logger.error("Wrong password");
    }

    //
    return res.status(404).json({
      status: "success",
      message: `Invalid credentials`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Invalid credentials",
    });
  }
};

//
const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, CONST_CONFIG_PRIVATE_KEY, {
    algorithm: "RS256",
  });
};

//
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
