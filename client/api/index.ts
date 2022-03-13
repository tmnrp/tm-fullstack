import axios from "axios";
import { toast } from "react-hot-toast";
import { utilBSGetAccessToken, utilSignOutUser } from "../utils/browserStorage";
import { validateTokens } from "../utils/tokenManagement";
import {
  CONST_CONFIG_BASE_URL,
  CONST_CONFIG_EXCLUDE_PROTECTED_ROUTES,
} from "../constants";

//
export const axiosRequest = axios.create({ baseURL: CONST_CONFIG_BASE_URL });

//
axiosRequest.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${utilBSGetAccessToken()}`,
    };

    //
    const isExcludedRoute = CONST_CONFIG_EXCLUDE_PROTECTED_ROUTES.some(
      (excludedRoute) => {
        return window?.location?.pathname?.indexOf(excludedRoute) >= 0;
      }
    );
    if (!isExcludedRoute) {
      await validateTokens();
      config.headers = {
        Authorization: `Bearer ${utilBSGetAccessToken()}`,
      };
    }

    //
    return config;
  },
  (error) => error
);

//
axiosRequest.interceptors.response.use(
  (config) => config,
  (error) => {
    const { status } = error?.response;
    console.error(error);
    if (status === 401) {
      utilSignOutUser();
      toast.error(error?.response?.data?.message);
    } else {
      toast.error(
        error?.response?.data?.message || "Error, Please contact administrator"
      );
    }

    //
    return error;
  }
);
