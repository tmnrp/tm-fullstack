import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { CONST_CONFIG_PORT } from "./constants";
import { protectedRouteMiddleware } from "./middleware/protectedRoute.middleware";
import { COSNT_ROUTES } from "./router";
import { RightsRouter } from "./router/rights.router";
import { RolesRouter } from "./router/roles.router";
import { UserRouter } from "./router/users.router";
import { connectDB } from "./utils/db";
import { Logger } from "./utils/logger";
import { AuthRouter } from "./router/auth.router";
import { HateoasRouter } from "./router/hateoas.router";

// Main
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Loggers
app.use(morgan("tiny"));

// DB
connectDB();

// Routers
app.use(COSNT_ROUTES.AUTH, AuthRouter);

// protected routes
app.use(protectedRouteMiddleware);
app.use(COSNT_ROUTES.RIGHTS, RightsRouter);
app.use(COSNT_ROUTES.ROLES, RolesRouter);
app.use(COSNT_ROUTES.USERS, UserRouter);
app.use(COSNT_ROUTES.HATEOAS, HateoasRouter);

//
app.listen(process.env.PORT || CONST_CONFIG_PORT, () => {
  Logger.info(`Server running on port ${CONST_CONFIG_PORT}`);
});
