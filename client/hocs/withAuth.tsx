/* eslint-disable react/display-name */
import React from "react";
import { useValidateTokens } from "../hooks/useValidateTokens";

//
export const withAuth = (Cmp: any) => {
  return () => (useValidateTokens() ? <Cmp /> : null);
};
