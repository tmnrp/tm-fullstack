import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { APIAuthRefreshAccessToken } from "../api/security/APIAuth";
import { CONST_CONFIG_PUBLIC_KEY } from "../constants";
import {
  utilBSGetAccessToken,
  utilBSGetRefreshToken,
  utilSignOutUser,
} from "../utils/browserStorage";

export const useValidateTokens = (): boolean => {
  const accessToken = utilBSGetAccessToken();
  const refreshToken = utilBSGetRefreshToken();
  const [isValid, setIsValid] = useState(false);

  //
  useEffect(() => {
    (async () => {
      //
      try {
        jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
        setIsValid(true);
      } catch (error: any) {
        console.error("useValidateTokens: access token expired", error);

        //
        try {
          //
          jwt.verify(refreshToken, CONST_CONFIG_PUBLIC_KEY);
          await APIAuthRefreshAccessToken();
          setIsValid(true);
        } catch (error: any) {
          console.error("useValidateTokens: refresh token expired", error);
          utilSignOutUser();
        }
      }
    })();
  }, [accessToken, refreshToken]);

  //
  return isValid;
};
