import { AxiosRequest } from "..";
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
    const request = AxiosRequest({
      baseURL: AxiosRequest.BASE_URL,
    });

    //
    return await request.post("/api/auth/login", {
      username: data.credNm,
      password: data.credPwd,
    });
  } catch (error: any) {
    console.error("APIAuthPostLogin", error);
  }
};

//
export const APIAuthRefreshAccessToken = async () => {
  try {
    const request = AxiosRequest({
      baseURL: AxiosRequest.BASE_URL,
    });

    const accessToken = utilBSGetAccessToken();
    const refreshToken = utilBSGetRefreshToken();
    const res = await request.post("/api/auth/refresh-token", {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    res?.data?.newAccessToken &&
      refreshToken &&
      utilBSSetTokens({
        accessToken: res?.data?.newAccessToken,
        refreshToken: refreshToken,
      });
  } catch (error: any) {
    console.error("APIAuthRefreshAccessToken", error);
  }
};
