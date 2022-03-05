import jwt from "jsonwebtoken";
import { APIAuth } from "../api/security/APIAuth";
import { CONST_CONFIG_PUBLIC_KEY, CONST_PAGES } from "../constants";

//
export const CONST_STORAGE = {
  tokens: "tokens",
};

//
export const signOutUser = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.clear();
    window.location.href = `${window.location.origin}${CONST_PAGES.AUTH.LOGIN.PATH}`;
  }
};

//
export const utilBSGetTokens = (): {
  accessToken: string;
  refreshToken: string;
} =>
  typeof localStorage !== "undefined" &&
  JSON.parse(localStorage.getItem(CONST_STORAGE["tokens"]) || "{}");

//
export const utilBSIsUserLoggedIn = async () => {
  const { accessToken, refreshToken } = utilBSGetTokens();
  try {
    //
    jwt.verify(accessToken, CONST_CONFIG_PUBLIC_KEY);
  } catch (error: any) {
    try {
      //
      jwt.verify(refreshToken, CONST_CONFIG_PUBLIC_KEY);
      await APIAuth.refreshToken();
    } catch (error: any) {
      console.error(error);
      signOutUser();
    }
  }
};

//
export const utilBSSetTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  typeof localStorage !== "undefined" &&
    localStorage.setItem("tokens", JSON.stringify(tokens));
};
