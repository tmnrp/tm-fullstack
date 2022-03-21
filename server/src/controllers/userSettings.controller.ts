import { Request, Response } from "express";
import { userSettingsModel } from "../models/userSettings.model";
import { Logger } from "../utils/logger";

//
export const getUserSettings = async (req: Request, res: Response) => {
  try {
    const userSettings = await userSettingsModel
      .find({ ...req.query })
      .populate("usersID");
    Logger.info(userSettings);
    return res.status(200).json({
      status: "success",
      items: userSettings,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching user settings",
    });
  }
};

//
export const getUserSettingsById = async (req: Request, res: Response) => {
  try {
    const user = await userSettingsModel
      .findById(req.params?.id)
      .populate("usersID");
    Logger.info(user);
    return res.status(200).json({
      status: "success",
      items: user,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching user settings",
    });
  }
};

//
export const updateUserSettings = async (req: Request, res: Response) => {
  try {
    const result = await userSettingsModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully updated user settings`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error updating user settings",
    });
  }
};

//
export const deleteUserSettings = async (req: Request, res: Response) => {
  try {
    const result = await userSettingsModel.findOneAndDelete({
      _id: req.params.id,
    });
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully deleted user settings`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error deleting user settings",
    });
  }
};
