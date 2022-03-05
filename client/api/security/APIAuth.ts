import { AxiosRequest } from "..";

//
export const APIAuth = {
  login: async (data: { credNm: string; credPwd: string }) => {
    const request = AxiosRequest({
      baseURL: AxiosRequest.BASE_URL,
    });

    //
    return await request.post("/api/auth/login", {
      username: data.credNm,
      password: data.credPwd,
    });
  },
};
