import { NextRouter } from "next/router";
import { CONST_PAGES } from "../constants";

//
export const CONST_STORAGE = {
  tokens: "tokens",
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
export const DEFAULT_TOKENS = {
  accessToken: "",
  refreshToken: "",
};
export interface IUtilBSGetTokens {
  accessToken: string;
  refreshToken: string;
}
export const utilBSGetTokens = (): IUtilBSGetTokens => {
  //
  if (typeof localStorage !== "undefined") {
    const tokens = localStorage.getItem(CONST_STORAGE["tokens"]);
    if (tokens) {
      return JSON.parse(tokens);
    }
  }

  //
  return DEFAULT_TOKENS;
};

//
export const utilBSSetTokens = (tokens: {
  accessToken: string;
  refreshToken: string;
}) => {
  typeof localStorage !== "undefined" &&
    localStorage.setItem("tokens", JSON.stringify(tokens));
};
