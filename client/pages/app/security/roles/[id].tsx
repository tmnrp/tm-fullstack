import * as Yup from "yup";
import { Form, Formik } from "formik";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { AxiosRequest } from "../../../../api";
import { APIRightsGet, IRights } from "../../../../api/security/APIRights";
import { Button } from "../../../../components/button/Button";
import { PageWrap } from "../../../../components/PageWrap";
import { CONST_PAGES, CONST_PAGE_MODE } from "../../../../constants";
import { useZSBreadcrumbRef } from "../../../../utils/store";
import {
  IRolesGET,
  IRoles,
  APIRolesGetById,
  APIRolesPost,
  APIRolesPut,
} from "../../../../api/security/APIRoles";
import { utilBSIsUserLoggedIn } from "../../../../utils/browserStorage";

//
const RoleDetails = () => {
  utilBSIsUserLoggedIn();

  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const router = useRouter();
  const id = router.query.id;
  const isNewPage = id === CONST_PAGE_MODE.NEW;

  //
  const [roleDetails, setRoleDetails] = useState<IRolesGET>();
  useEffect(() => {
    if (id && !isNewPage) {
      APIRolesGetById(
        `${id}`,
        (res) =>
          !AxiosRequest.isAxiosError(res) && setRoleDetails(res?.data?.items)
      );
    }
  }, [id, isNewPage]);

  //
  const [rights, setRights] = useState<Array<IRoles>>([]);
  useEffect(() => {
    APIRightsGet((res) => {
      !AxiosRequest.isAxiosError(res) && setRights(res.data.items || []);
    });
  }, []);

  //
  return (
    <PageWrap
      actions={
        <div className="flex space-x-2">
          <Button.Cancel
            onClick={() => router.push(CONST_PAGES.APP.SECURITY.ROLES.PATH)}
          />

          <Button.Save form="form" type="submit" />
        </div>
      }
    >
      <Formik
        key={`key-${roleDetails}`}
        initialValues={{
          name: roleDetails?.name || "",
          rightsID: roleDetails?.rightsID?.map((right) => `${right._id}`) || [],
        }}
        onSubmit={(values: IRoles) =>
          submitHandler({ id: `${id}`, isNewPage, values })
        }
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => (
          <Form
            id="form"
            className="justify-center px-4 py-6 space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col space-y-1">
              <div className="tracking-widest">Role name</div>
              <input
                className="tm-input"
                type="search"
                name="name"
                placeholder="Enter role name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              <span className="text-sm text-red-700">
                {errors.name && touched.name && errors.name}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex justify-between tracking-widest">
                <div>Rights</div>
                <Button.ClearIcon
                  type="button"
                  onClick={() => setFieldValue("rightsID", [])}
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-full">
                  <select
                    className="w-full tm-input member-relation"
                    name="rightsID"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.rightsID}
                    multiple
                  >
                    <option disabled value={""}>
                      Select rights
                    </option>
                    {rights.map((type: IRights, i: number) => (
                      <option key={i} value={type._id}>
                        {type?.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-red-700">
                    {errors.rightsID && touched.rightsID && errors.rightsID}
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
export default RoleDetails;

//
const submitHandler = ({
  id,
  isNewPage,
  values,
}: {
  id: string;
  isNewPage: boolean;
  values: IRoles;
}) => {
  if (isNewPage) {
    APIRolesPost(values, (res) => {
      if (!AxiosRequest.isAxiosError(res)) {
        toast.success(`Successfully created right`);
        router.push(CONST_PAGES.APP.SECURITY.ROLES.PATH);
      }
    });
  } else {
    id &&
      APIRolesPut(id, values, (res) => {
        if (!AxiosRequest.isAxiosError(res)) {
          toast.success(`Successfully updated right`);
          router.push(CONST_PAGES.APP.SECURITY.ROLES.PATH);
        }
      });
  }
};

//
const validationSchema = Yup.object({
  name: Yup.string().required("This field is required"),
});

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="interests" />,
    label: "Roles",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Details",
  },
];
