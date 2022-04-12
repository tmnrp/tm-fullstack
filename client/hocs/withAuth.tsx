/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { CONST_PAGES } from "../constants";
import { validateTokens } from "../utils/tokenManagement";

//
export const withAuth = (Cmp: any) => {
  //
  return () => {
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
      (async () => {
        const res = await validateTokens();
        if (!res) {
          window.location.href = `${window.location.origin}${CONST_PAGES.AUTH.LOGIN.PATH}`;
        }

        //
        setIsValid(res);
      })();
    }, []);

    return isValid ? <Cmp /> : null;
  };
};
