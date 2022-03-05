import { AxiosResponse } from "axios";
import { AxiosRequest } from "..";
import { utilBSIsUserLoggedIn } from "../../utils/browserStorage";

//
export const APIRightsGet = async (
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.get("/api/rights");
  callback(res);
};

//
export const APIRightsGetById = async (
  id: string,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.get(`/api/rights/${id}`);
  callback(res);
};

//
export const APIRightsPost = async (
  values: IRights,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.post("/api/rights", values);
  callback(res);
};

//
export const APIRightsPut = async (
  id: string,
  values: IRights,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.put(`/api/rights/${id}`, values);
  callback(res);
};

//
export const APIRightsDelete = async (
  id: string,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.delete(`/api/rights/${id}`);
  callback(res);
};

//
export interface IRights {
  _id?: string;
  name: string | undefined;
}
