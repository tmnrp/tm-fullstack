import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CONST_CONFIG_PUBLIC_KEY } from "../constants";

//
const CONST_PRIVATE_ROUTES: Array<string> = [];

//
export const protectedRouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (CONST_PRIVATE_ROUTES.some((path) => req.path.indexOf(path) >= 0)) {
    try {
      const accessToken = req?.headers?.authorization?.split(" ")?.[1] || "";
      jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
    } catch (error) {
      return res.status(403).send({
        status: "failed",
        message: "Access denied",
      });
    }
  }

  //
  next();
};
