import express from "express";
import {
  getRights,
  getRightById,
  insertRights,
  updateRight,
  deleteRight,
} from "../controllers/rights.controller";

export const RightsRouter = express.Router();

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
RightsRouter.get("/", getRights);

/**
 * @openapi
 * /api/rights/:id:
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
RightsRouter.get("/:id", getRightById);

/**
 * @openapi
 * /api/rights:
 *   post:
 *     tags:
 *     - "rights"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: Right object that needs to be added to the store
 *       content:
 *         application/json:
 *           schema:
 *         application/xml:
 *           schema:
 *       required: true
 *     responses:
 *       "201":
 *          description: "created"
 *       "500":
 *         description: "Server error"
 */
RightsRouter.post("/", insertRights);

/**
 * @openapi
 * /api/rights:
 *   put:
 *     tags:
 *     - "rights"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: Right object that needs to be added to the store
 *       content:
 *         application/json:
 *           schema:
 *         application/xml:
 *           schema:
 *       required: true
 *     responses:
 *       "201":
 *          description: "created"
 *       "500":
 *         description: "Server error"
 */
RightsRouter.put("/:id", updateRight);

/**
 * @openapi
 * /api/rights:
 *   delete:
 *     tags:
 *     - "rights"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: Right object that needs to be added to the store
 *       content:
 *         application/json:
 *           schema:
 *         application/xml:
 *           schema:
 *       required: true
 *     responses:
 *       "201":
 *          description: "created"
 *       "500":
 *         description: "Server error"
 */
RightsRouter.delete("/:id", deleteRight);
