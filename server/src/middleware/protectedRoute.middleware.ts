import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CONST_CONFIG_PUBLIC_KEY } from "../constants";

//
export const protectedRouteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenFromReq(req);

  //
  try {
    // Verify access token
    jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
  } catch (error: any) {
    return res.status(401).json({
      status: "Failed",
      message: "Require Authntication",
    });
  }

  //
  next();
};

export const getAccessTokenFromReq = (req: Request) => {
  return req?.headers?.authorization?.split(" ")?.[1] || "";
};
