import { AxiosRequest } from "..";
import { IRoles } from "./APIRoles";

//
export const APIUsersGet = async () => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  return await request.get("/api/users");
};

//
export const APIUsersGetById = async (id: string) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  return await request.get(`/api/users/${id}`);
};

//
export const APIUsersPost = async (values: IUsers) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  return await request.post("/api/users", values);
};

//
export const APIUsersPut = async (id: string, values: IUsers) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  return await request.put(`/api/users/${id}`, values);
};

//
export const APIUsersDelete = async (id: string) => {
  const request = AxiosRequest({ baseURL: AxiosRequest.BASE_URL });
  return await request.delete(`/api/users/${id}`);
};

//
export interface IUsers {
  username: string | undefined;
  password: string | undefined;
  surName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  rolesID: string | undefined;
}

//
export interface IUsersGET {
  username: string | undefined;
  surName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  rolesID: IRoles;
}
