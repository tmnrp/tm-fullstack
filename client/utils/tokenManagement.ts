import jwt from "jsonwebtoken";
import { APIAuthRefreshAccessToken } from "../api/security/APIAuth";
import { CONST_CONFIG_PUBLIC_KEY } from "../constants";
import {
  utilBSGetAccessToken,
  utilBSGetRefreshToken,
  utilBSSignOutUser,
} from "./browserStorage";

//
export const validateTokens = async () => {
  const accessToken = utilBSGetAccessToken();
  const refreshToken = utilBSGetRefreshToken();

  //
  if (!accessToken && !refreshToken) {
    return false;
  } else {
    try {
      jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
      return true;
    } catch (error: any) {
      console.error("validateTokens: access token expired", error);

      //
      try {
        //
        jwt.verify(refreshToken, CONST_CONFIG_PUBLIC_KEY);
        await APIAuthRefreshAccessToken();
        return true;
      } catch (error: any) {
        console.error("validateTokens: refresh token expired", error);
        utilBSSignOutUser();
        return false;
      }
    }
  }
};
