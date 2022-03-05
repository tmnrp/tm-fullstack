import { AxiosRequest } from "..";
import { utilBSGetTokens, utilBSSetTokens } from "../../utils/browserStorage";

//
export const APIAuth = {
  //
  login: async (data: { credNm: string; credPwd: string }) => {
    const request = AxiosRequest({
      baseURL: AxiosRequest.BASE_URL,
    });

    //
    const res = await request.post("/api/auth/login", {
      username: data.credNm,
      password: data.credPwd,
    });

    res?.data?.items && utilBSSetTokens(res?.data?.items);
    return res;
  },

  //
  refreshToken: async () => {
    const request = AxiosRequest({
      baseURL: AxiosRequest.BASE_URL,
    });

    const { accessToken, refreshToken } = utilBSGetTokens();
    const res = await request.post("/api/auth/refresh-token", {
      accessToken: accessToken,
      refreshToken: refreshToken,
    });

    res?.data?.newAccessToken &&
      utilBSSetTokens({
        accessToken: res?.data?.newAccessToken,
        refreshToken: refreshToken,
      });
  },
};
