import { CONST_MODEL_NAMES } from "../constants";

export const COSNT_ROUTES = {
  AUTH: `/api/auth`,
  USERS: `/api/${CONST_MODEL_NAMES.users}`,
  USER_SETTINGS: `/api/${CONST_MODEL_NAMES["user-settings"]}`,
  RIGHTS: `/api/${CONST_MODEL_NAMES.rights}`,
  ROLES: `/api/${CONST_MODEL_NAMES.roles}`,
  HATEOAS: `/api/${CONST_MODEL_NAMES.hateoas}`,
};
