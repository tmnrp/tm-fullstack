import express from "express";
import { getHateosOverview } from "../controllers/hateos.controller";

export const HateosRouter = express.Router();

/**
 * @openapi
 * /api/rights:
 *   get:
 *     tags:
 *     - "rights"
 *     summary: "return all rights"
 *     description: "rights description"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *          description: "Successful"
 *       "500":
 *         description: "Server error"
 */
HateosRouter.get("/", getHateosOverview);
