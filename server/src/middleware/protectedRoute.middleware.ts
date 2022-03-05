import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CONST_CONFIG_PUBLIC_KEY } from "../constants";
import { generateAccessTokenByUserId } from "../controllers/auth.controller";

//
export const protectedRouteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req?.headers?.authorization?.split(" ")?.[1] || "";

  //
  try {
    // Verify access token
    jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
  } catch (error: any) {
    //
    try {
      // verify refresh token
      const refreshToken = `${req?.headers?.["x-refresh-token"]}`;
      jwt.verify(refreshToken, accessToken);

      //
      const user: any = jwt.decode(accessToken);
      const newAccessToken = await generateAccessTokenByUserId(user?._id);
      res.locals.newAccessToken = newAccessToken;
    } catch (error: any) {
      //
      return res.status(401).json({
        status: "failed",
        message: "Session expired, please relogin",
      });
    }
  }

  //
  next();
};
