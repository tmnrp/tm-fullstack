import { axiosRequest } from "..";
import { IRights } from "./APIRights";

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

//
export const APIRolesGet = async () => {
  try {
    return await axiosRequest.get("/api/roles");
  } catch (error: any) {
    return error;
  }
};

//
export const APIRolesGetById = async (id: string) => {
  try {
    return await axiosRequest.get(`/api/roles/${id}`);
  } catch (error: any) {
    return error;
  }
};

//
export const APIRolesPost = async (values: IRoles) => {
  try {
    return await axiosRequest.post("/api/roles", values);
  } catch (error: any) {
    return error;
  }
};

//
export const APIRolesPut = async (id: string, values: IRoles) => {
  try {
    return await axiosRequest.put(`/api/roles/${id}`, values);
  } catch (error: any) {
    return error;
  }
};

//
export const APIRolesDelete = async (id: string) => {
  try {
    return await axiosRequest.delete(`/api/roles/${id}`);
  } catch (error: any) {
    return error;
  }
};
