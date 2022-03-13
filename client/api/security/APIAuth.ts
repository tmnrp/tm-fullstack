import axios from "axios";
import { axiosRequest } from "..";
import { CONST_CONFIG_BASE_URL } from "../../constants";
import {
  utilBSGetAccessToken,
  utilBSGetRefreshToken,
  utilBSSetTokens,
} from "../../utils/browserStorage";

//
export const APIAuthPostLogin = async (data: {
  credNm: string;
  credPwd: string;
}) => {
  try {
    //
    return await axiosRequest.post("/api/auth/login", {
      username: data.credNm,
      password: data.credPwd,
    });
  } catch (error: any) {
    return error;
  }
};

//
export const APIAuthRefreshAccessToken = async () => {
  try {
    const accessToken = utilBSGetAccessToken();
    const refreshToken = utilBSGetRefreshToken();
    const res = await axios.post(
      `${CONST_CONFIG_BASE_URL}api/auth/refresh-token`,
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res?.data?.newAccessToken &&
      refreshToken &&
      utilBSSetTokens({
        accessToken: res?.data?.newAccessToken,
        refreshToken: refreshToken,
      });
  } catch (error: any) {
    return error;
  }
};
