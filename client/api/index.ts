import axios from "axios";
import { toast } from "react-hot-toast";
import { CONST_PAGES } from "../constants";
import { utilBSGetTokens } from "../utils/browserStorage";

//
export const AxiosRequest = ({ baseURL = "" }: { baseURL: string }) => {
  const request = axios.create({
    baseURL: baseURL,
  });

  request.interceptors.request.use(
    (config) => {
      const { accessToken } = utilBSGetTokens();
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      return config;
    },
    (error) => error
  );

  // Add a response interceptor
  request.interceptors.response.use(
    (config) => config,
    (error) => {
      const { status } = error?.response;
      console.error(error);
      if (status === 401) {
        window.location.href = `${window.location.origin}${CONST_PAGES.AUTH.LOGIN.PATH}`;
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(
          error?.response?.data?.message ||
            "Error, Please contact administrator"
        );
      }

      //
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
