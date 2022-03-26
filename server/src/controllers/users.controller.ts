import { Request, Response } from "express";
import { IUsers, usersModel } from "../models/users.model";
import { bcryptHash } from "../utils/bcrypt";
import { Logger } from "../utils/logger";

//
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await usersModel.find({ ...req.query }).populate("rolesID");
    Logger.info(users);
    return res.status(200).json({
      status: "success",
      items: users,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching users",
    });
  }
};

//
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await usersModel.findById(req.params?.id).populate("rolesID");
    Logger.info(user);
    return res.status(200).json({
      status: "success",
      items: user,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching user",
    });
  }
};

//
export const insertUser = (req: Request, res: Response) => {
  const { password, ...user } = (req.body as IUsers) || {};
  password &&
    bcryptHash(password, async (error, hash) => {
      if (error) throw error;

      //
      try {
        const result = await usersModel.create({
          password: hash,
          ...user,
        });
        Logger.info(result);
        return res.status(201).json({
          status: "success",
          message: `Successfully created user ${user.username}`,
        });
      } catch (error) {
        Logger.error(error);
        return res.status(500).json({
          success: "failed",
          message: "Error inserting user",
        });
      }
    });
};

//
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { password, ...payload } = req.body;
    const result = await usersModel.findByIdAndUpdate(req.params.id, payload);
    Logger.info(result);

    //
    return res.status(200).json({
      status: "success",
      message: `Successfully updated user ${result?.username}`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error updating user",
    });
  }
};

//
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await usersModel.findOneAndDelete({ _id: req.params.id });
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully deleted user`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error deleting user",
    });
  }
};
