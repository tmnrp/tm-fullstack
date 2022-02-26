import express from "express";
import { insertSuper, postLogin } from "../controllers/auth.controller";

//
export const AuthRouter = express.Router();

//
AuthRouter.post("/login", postLogin);
AuthRouter.post("/super", insertSuper);
