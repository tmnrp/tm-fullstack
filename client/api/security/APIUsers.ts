import { axiosRequest } from "..";
import { IRoles } from "./APIRoles";

//
export interface IUsers {
  username: string | undefined;
  password: string | undefined;
  surName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  rolesID: string | undefined;
}

//
export interface IUsersGET {
  username: string | undefined;
  surName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  rolesID: IRoles;
}

//
export const APIUsersGet = async () => {
  try {
    return await axiosRequest.get("/api/users");
  } catch (error: any) {
    return error;
  }
};

//
export const APIUsersGetById = async (id: string) => {
  try {
    return await axiosRequest.get(`/api/users/${id}`);
  } catch (error: any) {
    return error;
  }
};

//
export const APIUsersPost = async (values: IUsers) => {
  try {
    return await axiosRequest.post("/api/users", values);
  } catch (error: any) {
    return error;
  }
};

//
export const APIUsersPut = async (id: string, values: IUsers) => {
  try {
    return await axiosRequest.put(`/api/users/${id}`, values);
  } catch (error: any) {
    return error;
  }
};

//
export const APIUsersDelete = async (id: string) => {
  try {
    return await axiosRequest.delete(`/api/users/${id}`);
  } catch (error: any) {
    return error;
  }
};
