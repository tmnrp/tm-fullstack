import { Request, Response } from "express";
import { Logger } from "../utils/logger";
import { getAccessTokenFromReq } from "../middleware/protectedRoute.middleware";
import jwt from "jsonwebtoken";

//
export const getHateosOverview = async (req: Request, res: Response) => {
  try {
    const accessToken = getAccessTokenFromReq(req);
    const accessDetails: any = jwt.decode(accessToken);
    const hateosRights = accessDetails?.rolesID?.rightsID?.reduce(
      (acc: any, curr: any) => {
        //
        const name = curr?.name;
        acc[name] = curr;

        //
        return acc;
      },
      {}
    );

    //
    Logger.info(hateosRights);
    return res.status(200).json({
      status: "success",
      items: hateosRights,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching rights",
    });
  }
};
