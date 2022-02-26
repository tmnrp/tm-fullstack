import express from "express";
import {
  getUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

export const UserRouter = express.Router();

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
UserRouter.get("/", getUsers);

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
UserRouter.get("/:id", getUserById);

/**
 * @openapi
 * /api/users:
 *   post:
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
UserRouter.post("/", insertUser);

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
UserRouter.put("/:id", updateUser);

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
UserRouter.delete("/:id", deleteUser);
