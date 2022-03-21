import express from "express";
import {
  getUserSettings,
  getUserSettingsById,
  updateUserSettings,
  deleteUserSettings,
} from "../controllers/userSettings.controller";

export const UserSettingsRouter = express.Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *     - "users"
 *     summary: "return all users"
 *     description: "users description"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *          description: "Successful"
 *       "500":
 *         description: "Server error"
 */
UserSettingsRouter.get("/", getUserSettings);

/**
 * @openapi
 * /api/users/:id:
 *   get:
 *     tags:
 *     - "users"
 *     summary: "return all users"
 *     description: "users description"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *          description: "Successful"
 *       "500":
 *         description: "Server error"
 */
UserSettingsRouter.get("/:id", getUserSettingsById);

/**
 * @openapi
 * /api/users:
 *   put:
 *     tags:
 *     - "users"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: User object that needs to be added to the store
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
UserSettingsRouter.put("/:id", updateUserSettings);

/**
 * @openapi
 * /api/users:
 *   delete:
 *     tags:
 *     - "users"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: User object that needs to be added to the store
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
UserSettingsRouter.delete("/:id", deleteUserSettings);
