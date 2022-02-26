import express from "express";
import {
  getRoles,
  getRoleById,
  insertRoles,
  updateRole,
  deleteRole,
} from "../controllers/roles.controller";

export const RolesRouter = express.Router();

/**
 * @openapi
 * /api/roles:
 *   get:
 *     tags:
 *     - "roles"
 *     summary: "return all roles"
 *     description: "roles description"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *          description: "Successful"
 *       "500":
 *         description: "Server error"
 */
RolesRouter.get("/", getRoles);

/**
 * @openapi
 * /api/roles/:id:
 *   get:
 *     tags:
 *     - "roles"
 *     summary: "return all roles"
 *     description: "roles description"
 *     produces:
 *     - "application/json"
 *     responses:
 *       "200":
 *          description: "Successful"
 *       "500":
 *         description: "Server error"
 */
RolesRouter.get("/:id", getRoleById);

/**
 * @openapi
 * /api/roles:
 *   post:
 *     tags:
 *     - "roles"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: Role object that needs to be added to the store
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
RolesRouter.post("/", insertRoles);

/**
 * @openapi
 * /api/roles:
 *   put:
 *     tags:
 *     - "roles"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: Role object that needs to be added to the store
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
RolesRouter.put("/:id", updateRole);

/**
 * @openapi
 * /api/roles:
 *   delete:
 *     tags:
 *     - "roles"
 *     summary: "insert a user"
 *     description: "Insert a new user into the DB"
 *     produces:
 *     - "application/json"
 *     requestBody:
 *       description: Role object that needs to be added to the store
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
RolesRouter.delete("/:id", deleteRole);
