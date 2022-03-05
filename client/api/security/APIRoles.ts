import { AxiosResponse } from "axios";
import { AxiosRequest } from "..";
import { utilBSIsUserLoggedIn } from "../../utils/browserStorage";
import { IRights } from "./APIRights";

//
export const APIRolesGet = async (
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.get("/api/roles");
  callback(res);
};

//
export const APIRolesGetById = async (
  id: string,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.get(`/api/roles/${id}`);
  callback(res);
};

//
export const APIRolesPost = async (
  values: IRoles,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.post("/api/roles", values);
  callback(res);
};

//
export const APIRolesPut = async (
  id: string,
  values: IRoles,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.put(`/api/roles/${id}`, values);
  callback(res);
};

//
export const APIRolesDelete = async (
  id: string,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  await utilBSIsUserLoggedIn();
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.delete(`/api/roles/${id}`);
  callback(res);
};

//
export interface IRoles {
  _id?: string | undefined;
  name: string | undefined;
  rightsID: Array<string>;
}

//
export interface IRolesGET {
  _id?: string | undefined;
  name: string | undefined;
  rightsID: Array<IRights>;
}
