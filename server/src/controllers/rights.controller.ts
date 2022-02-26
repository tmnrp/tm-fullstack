import { Request, Response } from "express";
import { Logger } from "../utils/logger";
import { IRights, rightsModel } from "../models/rights.model";

//
export const getRights = async (req: Request, res: Response) => {
  try {
    const rights = await rightsModel.find({ ...req.query });
    Logger.info(rights);
    return res.status(200).json({
      status: "success",
      items: rights,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching rights",
    });
  }
};

//
export const getRightById = async (req: Request, res: Response) => {
  try {
    const right = await rightsModel.findById(req.params?.id);
    Logger.info(right);
    return res.status(200).json({
      status: "success",
      items: right,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching right",
    });
  }
};

//
export const insertRights = async (req: Request, res: Response) => {
  const rights = (req.body as Array<IRights>) || {};
  try {
    const result = await rightsModel.insertMany(rights);
    Logger.info(result);
    return res.status(201).json({
      status: "success",
      message: `Successfully created rights`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error inserting right",
    });
  }
};

//
export const updateRight = async (req: Request, res: Response) => {
  try {
    const result = await rightsModel.findByIdAndUpdate(req.params.id, req.body);
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully updated right`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error updating right",
    });
  }
};

//
export const deleteRight = async (req: Request, res: Response) => {
  try {
    const result = await rightsModel.findOneAndDelete({
      _id: req.params.id,
    });
    Logger.info(result);
    return res.status(200).json({
      status: "success",
      message: `Successfully deleted right`,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error deleting right",
    });
  }
};
