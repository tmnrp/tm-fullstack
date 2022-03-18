import { Request, Response } from "express";
import { Logger } from "../utils/logger";
import { getAccessTokenFromReq } from "../middleware/protectedRoute.middleware";
import jwt from "jsonwebtoken";

//
export const getHateoasOverview = async (req: Request, res: Response) => {
  try {
    const accessToken = getAccessTokenFromReq(req);
    const accessDetails: any = jwt.decode(accessToken);
    console.log("accessDetails", accessDetails);

    const hateoasRights = accessDetails?.rolesID?.rightsID?.reduce(
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
    Logger.info("hateoasRights", hateoasRights);
    return res.status(200).json({
      status: "success",
      items: hateoasRights,
    });
  } catch (error) {
    Logger.error(error);
    return res.status(500).json({
      success: "failed",
      message: "Error fetching rights",
    });
  }
};
