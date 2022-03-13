import { axiosRequest } from "..";

//
export interface IRights {
  _id?: string;
  name: string | undefined;
}

//
export const APIRightsGet = async () => {
  try {
    return await axiosRequest.get("/api/rights");
  } catch (error: any) {
    return error;
  }
};

//
export const APIRightsGetById = async (id: string) => {
  try {
    return await axiosRequest.get(`/api/rights/${id}`);
  } catch (error: any) {
    return error;
  }
};

//
export const APIRightsPost = async (values: IRights) => {
  try {
    return await axiosRequest.post("/api/rights", values);
  } catch (error: any) {
    return error;
  }
};

//
export const APIRightsPut = async (id: string, values: IRights) => {
  try {
    return await axiosRequest.put(`/api/rights/${id}`, values);
  } catch (error: any) {
    return error;
  }
};

//
export const APIRightsDelete = async (id: string) => {
  try {
    return await axiosRequest.delete(`/api/rights/${id}`);
  } catch (error: any) {
    return error;
  }
};
