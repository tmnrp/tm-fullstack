import { AxiosResponse } from "axios";
import { AxiosRequest } from "..";
import { IRoles } from "./APIRoles";

//
export const APIUsersGet = async (
  callback: (res: AxiosResponse<any, any>) => void
) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.get("/api/users");
  callback(res);
};

//
export const APIUsersGetById = async (
  id: string,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.get(`/api/users/${id}`);
  callback(res);
};

//
export const APIUsersPost = async (
  values: IUsers,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.post("/api/users", values);
  callback(res);
};

//
export const APIUsersPut = async (
  id: string,
  values: IUsers,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.put(`/api/users/${id}`, values);
  callback(res);
};

//
export const APIUsersDelete = async (
  id: string,
  callback: (res: AxiosResponse<any, any>) => void
) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  const res = await request.delete(`/api/users/${id}`);
  callback(res);
};

//
export interface IUsers {
  username: string | undefined;
  password: string | undefined;
  rolesID: string | undefined;
}

//
export interface IUsersGET {
  username: string | undefined;
  rolesID: IRoles;
}
