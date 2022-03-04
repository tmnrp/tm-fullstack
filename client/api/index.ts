import axios from "axios";
import { toast } from "react-hot-toast";
import { getAccessToken } from "../utils";

//
export const AxiosRequest = ({ baseURL = "" }: { baseURL: string }) => {
  const request = axios.create({
    baseURL: baseURL,
  });

  request.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken();
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return config;
    },
    (error) => error
  );

  // Add a response interceptor
  request.interceptors.response.use(
    (response) => response,
    (error) => {
      toast.error(
        error?.response?.data?.message || "Error, Please contact administrator"
      );
      return error;
    }
  );

  //
  return request;
};

//
AxiosRequest.isAxiosError = (res: any) => axios.isAxiosError(res);

//
AxiosRequest.BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001/"
    : "https://tm-fullstack.herokuapp.com/";
