import { AxiosResponse } from "axios";
import { AxiosRequest } from "..";

//
export const APIAuth = {
  login: async (
    data: { credNm: string; credPwd: string },
    callback: (res: AxiosResponse<any, any>) => void
  ) => {
    const request = AxiosRequest({
      baseURL: AxiosRequest.BASE_URL,
    });
    const res = await request.post("/api/auth/login", {
      username: data.credNm,
      password: data.credPwd,
    });

    callback(res);
  },
};
