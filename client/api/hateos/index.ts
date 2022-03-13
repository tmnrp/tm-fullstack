import { axiosRequest } from "..";

export const APIHateosGet = async () => {
  try {
    return await axiosRequest.get("/api/hateos");
  } catch (error: any) {
    return error;
  }
};
