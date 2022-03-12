import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { CONST_PAGES } from "../../../constants";
import { AxiosRequest } from "../../../api";
import { IUtilBSTokens, utilBSSetTokens } from "../../../utils/browserStorage";
import { APIAuthPostLogin } from "../../../api/security/APIAuth";
import {
  useZSSetAccessToken,
  useZSSetRefreshToken,
} from "../../../utils/store";

//
const Login = () => {
  const router = useRouter();

  //
  const setAccessToken = useZSSetAccessToken();
  const setRefreshToken = useZSSetRefreshToken();

  //
  const submitHandler = useCallback(
    async (values: IUserCreds) => {
      const res = await APIAuthPostLogin({
        credNm: values.username,
        credPwd: values.password,
      });

      if (!AxiosRequest.isAxiosError(res)) {
        const tokens: IUtilBSTokens = res?.data?.items;

        if (tokens) {
          utilBSSetTokens(tokens);
          setAccessToken(tokens?.accessToken);
          setRefreshToken(tokens?.refreshToken);
          router.push(CONST_PAGES.APP.HOME.PATH);
        }
      }
    },
    [router, setAccessToken, setRefreshToken]
  );

  //
  return (
    <div className="h-full flex justify-center items-center">
      <div className="bg-surface-light-1 dark:bg-surface-dark-1 p-5 rounded-lg">
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(values: IUserCreds) => submitHandler(values)}
          validationSchema={validationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form
              id="form"
              className="justify-center px-4 py-6 space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col space-y-1">
                <div className="tracking-widest">Username</div>
                <input
                  className="tm-input"
                  type="search"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />

                <span className="text-sm text-red-700">
                  {errors.username && touched.username && errors.username}
                </span>
              </div>

              <div className="flex flex-col space-y-1">
                <div className="tracking-widest">Password</div>
                <input
                  className="tm-input"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values?.password}
                  autoComplete="new-password"
                />
                <span className="text-sm text-red-700">
                  {errors.password && touched.password && errors.password}
                </span>
              </div>

              <div>
                <button
                  className={`button mt-4 py-2 primary w-full uppercase ${
                    isSubmitting ? "disabled" : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

//
export default Login;

//
interface IUserCreds {
  username: string;
  password: string;
}

//
const validationSchema = Yup.object({
  username: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
});
