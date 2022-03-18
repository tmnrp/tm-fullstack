import express from "express";
import { getHateoasOverview } from "../controllers/hateoas.controller";

export const HateoasRouter = express.Router();

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
HateoasRouter.get("/", getHateoasOverview);
