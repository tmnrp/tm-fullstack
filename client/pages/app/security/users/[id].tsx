import * as Yup from "yup";
import { Form, Formik } from "formik";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { AxiosRequest } from "../../../../api";
import { IRoles, APIRolesGet } from "../../../../api/security/APIRoles";
import {
  IUsersGET,
  APIUsersGetById,
  IUsers,
  APIUsersPost,
  APIUsersPut,
} from "../../../../api/security/APIUsers";
import { Button } from "../../../../components/button/Button";
import { PageWrap } from "../../../../components/PageWrap";
import { CONST_PAGE_MODE, CONST_PAGES } from "../../../../constants";
import { useZustantStoreBreadcrumbRef } from "../../../../utils/store";

//
const UserDetails = () => {
  const breadcrumbRef = useZustantStoreBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const router = useRouter();
  const id = router.query.id;
  const isNewPage = id === CONST_PAGE_MODE.NEW;

  //
  const [userDetails, setUserDetails] = useState<IUsersGET>();
  useEffect(() => {
    if (id && !isNewPage) {
      APIUsersGetById(
        `${id}`,
        (res) =>
          !AxiosRequest.isAxiosError(res) && setUserDetails(res?.data?.items)
      );
    }
  }, [id, isNewPage]);

  //
  const [roles, setRoles] = useState<Array<IRoles>>([]);
  useEffect(() => {
    APIRolesGet((res) => {
      !AxiosRequest.isAxiosError(res) && setRoles(res.data.items || []);
    });
  }, []);

  //
  return (
    <PageWrap
      actions={
        <div className="flex space-x-2">
          <Button.Cancel
            onClick={() => router.push(CONST_PAGES.APP.SECURITY.USERS.PATH)}
          />

          <Button.Save form="form" type="submit" />
        </div>
      }
    >
      <Formik
        key={`key-${userDetails}`}
        initialValues={{
          username: userDetails?.username || "",
          password: "",
          surName: userDetails?.surName || "",
          firstName: userDetails?.firstName || "",
          lastName: userDetails?.lastName || "",
          rolesID: userDetails?.rolesID?._id || "",
        }}
        onSubmit={(values: IUsers) =>
          submitHandler({ id: `${id}`, isNewPage, values })
        }
        validationSchema={isNewPage ? validationSchema : validationSchemaEdit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
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

            {id && isNewPage && (
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
            )}

            <div className="flex flex-col space-y-1">
              <div className="tracking-widest">Sur name</div>
              <input
                className="tm-input"
                type="search"
                name="surName"
                placeholder="Enter sur name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surName}
              />

              <span className="text-sm text-red-700">
                {errors.surName && touched.surName && errors.surName}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="tracking-widest">First name</div>
              <input
                className="tm-input"
                type="search"
                name="firstName"
                placeholder="Enter first name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />

              <span className="text-sm text-red-700">
                {errors.firstName && touched.firstName && errors.firstName}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="tracking-widest">Last name</div>
              <input
                className="tm-input"
                type="search"
                name="lastName"
                placeholder="Enter last name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />

              <span className="text-sm text-red-700">
                {errors.lastName && touched.lastName && errors.lastName}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="tracking-widest">Role</div>
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <select
                    className="w-full tm-input member-relation"
                    name="rolesID"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rolesID}
                  >
                    <option value={""}>Select role</option>
                    {roles.map((type: IRoles, i: number) => (
                      <option key={i} value={type._id}>
                        {type?.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-red-700">
                    {errors.rolesID && touched.rolesID && errors.rolesID}
                  </span>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrap>
  );
};
export default UserDetails;

//
const submitHandler = ({
  id,
  isNewPage,
  values,
}: {
  id: string;
  isNewPage: boolean;
  values: IUsers;
}) => {
  if (values.rolesID === "") {
    delete values.rolesID;
  }

  if (isNewPage) {
    APIUsersPost({ ...values }, (res) => {
      if (!AxiosRequest.isAxiosError(res)) {
        toast.success(`Successfully created user ${values.username}`);
        router.push(CONST_PAGES.APP.SECURITY.USERS.PATH);
      }
    });
  } else {
    id &&
      APIUsersPut(id, values, (res) => {
        if (!AxiosRequest.isAxiosError(res)) {
          toast.success(`Successfully updated user ${values.username}`);
          router.push(CONST_PAGES.APP.SECURITY.USERS.PATH);
        }
      });
  }
};

//
const validationSchema = Yup.object({
  username: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required"),
  rolesID: Yup.string().required("This field is required"),
});
const validationSchemaEdit = Yup.object({
  username: Yup.string().required("This field is required"),
  rolesID: Yup.string().required("This field is required"),
});

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="interests" />,
    label: "Users",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Details",
  },
];
