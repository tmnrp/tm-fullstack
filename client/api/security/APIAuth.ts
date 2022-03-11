import { AxiosRequest } from "..";
import { utilBSGetTokens, utilBSSetTokens } from "../../utils/browserStorage";

//
export const APIAuthPostLogin = async (data: {
  credNm: string;
  credPwd: string;
}) => {
  const request = AxiosRequest({
    baseURL: AxiosRequest.BASE_URL,
  });

  //
  return await request.post("/api/auth/login", {
    username: data.credNm,
    password: data.credPwd,
  });
};

//
export const APIAuthRefreshAccessToken = async () => {
  const request = AxiosRequest({
    baseURL: AxiosRequest.BASE_URL,
  });

  const { accessToken, refreshToken } = utilBSGetTokens();
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
};
