import { NextRouter } from "next/router";
import { CONST_PAGES } from "../constants";

//
export const CONST_BROWSER_STORAGE_KEYS = {
  "access-token": "access-token",
  "refresh-token": "refresh-token",
};

//
interface IUtilSignOutUser {
  router?: NextRouter;
  revokeTokens?: () => void;
}
export const utilSignOutUser = (props?: IUtilSignOutUser) => {
  const { router, revokeTokens } = props || {};

  if (typeof localStorage !== "undefined") {
    //
    localStorage.clear();

    //
    revokeTokens && revokeTokens();

    //
    router
      ? router?.push(CONST_PAGES.AUTH.LOGIN.PATH)
      : (window.location.href = `${window.location.origin}${CONST_PAGES.AUTH.LOGIN.PATH}`);
  }
};

//
export interface IUtilBSTokens {
  accessToken: string;
  refreshToken: string;
}
export const utilBSGetAccessToken = (): string => {
  //
  if (typeof localStorage !== "undefined") {
    const tokens = localStorage.getItem(
      CONST_BROWSER_STORAGE_KEYS["access-token"]
    );
    if (tokens) {
      return JSON.parse(tokens);
    }
  }

  //
  return "";
};
export const utilBSGetRefreshToken = (): string => {
  //
  if (typeof localStorage !== "undefined") {
    const tokens = localStorage.getItem(
      CONST_BROWSER_STORAGE_KEYS["refresh-token"]
    );
    if (tokens) {
      return JSON.parse(tokens);
    }
  }

  //
  return "";
};

//
export const utilBSSetTokens = (tokens: IUtilBSTokens) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(
      CONST_BROWSER_STORAGE_KEYS["access-token"],
      JSON.stringify(tokens.accessToken)
    );
    localStorage.setItem(
      CONST_BROWSER_STORAGE_KEYS["refresh-token"],
      JSON.stringify(tokens.refreshToken)
    );
  }
};
