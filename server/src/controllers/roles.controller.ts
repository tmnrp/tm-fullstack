import { Request, Response } from "express";
import { Logger } from "../utils/logger";
import { IRoles, rolesModel } from "../models/roles.model";

//
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await rolesModel.find({ ...req.query }).populate("rightsID");
    Logger.info(roles);
    return res.status(200).json({
      status: "success",
      items: roles,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching roles",
    });
  }
};

//
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await rolesModel.findById(req.params?.id).populate("rightsID");
    Logger.info(role);
    return res.status(200).json({
      status: "success",
      items: role,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching role",
    });
  }
};

//
export const insertRoles = async (req: Request, res: Response) => {
  const roles = (req.body as Array<IRoles>) || {};
  try {
    const result = await rolesModel.insertMany(roles);
    Logger.info(result);
    return res.status(201).json({
      status: "success",
      message: `Successfully created roles`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error inserting role",
    });
  }
};

//
export const updateRole = async (req: Request, res: Response) => {
  try {
    const result = await rolesModel.findByIdAndUpdate(req.params.id, req.body);
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully updated role`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error updating role",
    });
  }
};

//
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const result = await rolesModel.findOneAndDelete({
      _id: req.params.id,
    });
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully deleted role`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error deleting role",
    });
  }
};
