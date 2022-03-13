/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { validateTokens } from "../utils/tokenManagement";

//
export const withAuth = (Cmp: any) => {
  return () => {
    const [isValid, setIsValid] = useState(false);
    useEffect(() => {
      (async () => {
        const res = await validateTokens();
        setIsValid(res);
      })();
    }, []);

    return isValid ? <Cmp /> : null;
  };
};
