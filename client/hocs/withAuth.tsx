/* eslint-disable react/display-name */
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
import {
  utilBSGetAccessToken,
  utilBSGetRefreshToken,
  utilSignOutUser,
} from "../utils/browserStorage";
import { CONST_CONFIG_PUBLIC_KEY } from "../constants";
import { APIAuthRefreshAccessToken } from "../api/security/APIAuth";
import { useRouter } from "next/router";

//
export const withAuth = (Cmp: any) => {
  return () => {
    const accessToken = utilBSGetAccessToken();
    const refreshToken = utilBSGetRefreshToken();
    const router = useRouter();
    const [isValid, setIsValid] = useState(false);

    //
    useEffect(() => {
      (async () => {
        //
        try {
          jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
          setIsValid(true);
        } catch (error: any) {
          console.error("withAuth: access token expired", error);

          //
          try {
            //
            jwt.verify(refreshToken, CONST_CONFIG_PUBLIC_KEY);
            await APIAuthRefreshAccessToken();
            setIsValid(true);
          } catch (error: any) {
            console.error("withAuth: refresh token expired", error);
            utilSignOutUser();
          }
        }
      })();
    }, [accessToken, refreshToken, router]);

    //
    return isValid ? <Cmp /> : null;
  };
};
