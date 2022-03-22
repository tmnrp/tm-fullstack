import { NextRouter } from "next/router";
import { useEffect } from "react";
import { CONST_PAGES } from "../constants";
import { useZSSetAccessToken, useZSSetRefreshToken } from "./store";
import jwt from "jsonwebtoken";

//
export const CONST_BROWSER_STORAGE_KEYS = {
  "access-token": "access-token",
  "refresh-token": "refresh-token",
};

/**
 * update the global state with the browser storage data after
 * the initial render to avoid state issues in component classnames.
 */
export const useSyncBSToZS = () => {
  //
  const setAccessToken = useZSSetAccessToken();
  useEffect(() => setAccessToken(utilBSGetAccessToken()), [setAccessToken]);

  //
  const setRefreshToken = useZSSetRefreshToken();
  useEffect(() => setRefreshToken(utilBSGetRefreshToken()), [setRefreshToken]);
};

//
interface IUtilBSSignOutUser {
  router?: NextRouter;
  revokeTokens?: () => void;
}
export const utilBSSignOutUser = (props?: IUtilBSSignOutUser) => {
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

//
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

//
export const utilBSGetAccessTokenDetails = () =>
  jwt.decode(utilBSGetAccessToken());
