import { axiosRequest } from "..";

export const APIHateoasGet = async () => {
  try {
    return await axiosRequest.get("/api/hateoas");
  } catch (error: any) {
    return error;
  }
};
