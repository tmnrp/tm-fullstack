import express from "express";
import {
  insertSuper,
  postLogin,
  postRefreshToken,
} from "../controllers/auth.controller";

//
export const AuthRouter = express.Router();

//
AuthRouter.post("/login", postLogin);
AuthRouter.post("/refresh-token", postRefreshToken);
AuthRouter.post("/super", insertSuper);
