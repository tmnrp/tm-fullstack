import * as Yup from "yup";
import { Form, Formik } from "formik";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
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
import { withAuth } from "../../../../hocs/withAuth";

//
const RoleDetails = () => {
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
    (async () => {
      if (id && !isNewPage) {
        const res = await APIRolesGetById(`${id}`);
        setRoleDetails(res?.data?.items);
      }
    })();
  }, [id, isNewPage]);

  //
  const [rights, setRights] = useState<Array<IRights>>([]);
  useEffect(() => {
    (async () => {
      const res = await APIRightsGet();
      setRights(res.data.items || []);
    })();
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
          label: roleDetails?.label || "",
          description: roleDetails?.description || "",
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
                className="input"
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
              <div className="tracking-widest">Label</div>
              <input
                className="input"
                type="search"
                name="label"
                placeholder="Enter user friendly name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
              />

              <span className="text-sm text-red-700">
                {errors.label && touched.label && errors.label}
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="tracking-widest">Description</div>
              <textarea
                className="textarea"
                name="description"
                placeholder="Enter description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
              />

              <span className="text-sm text-red-700">
                {errors.description &&
                  touched.description &&
                  errors.description}
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
              <div className="w-full">
                <select
                  className="select w-full member-relation"
                  name="rightsID"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rightsID}
                  multiple
                >
                  <option disabled value={""}>
                    Select rights
                  </option>
                  {rights.map(({ _id, label }: IRights, i: number) => {
                    return (
                      <option key={i} value={_id}>
                        {label}
                      </option>
                    );
                  })}
                </select>
                <span className="text-sm text-red-700">
                  {errors.rightsID && touched.rightsID && errors.rightsID}
                </span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrap>
  );
};
export default withAuth(RoleDetails);

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
  (async () => {
    if (isNewPage) {
      await APIRolesPost(values);
      toast.success(`Successfully created right`);
      router.push(CONST_PAGES.APP.SECURITY.ROLES.PATH);
    } else if (id) {
      await APIRolesPut(id, values);
      toast.success(`Successfully updated right`);
      router.push(CONST_PAGES.APP.SECURITY.ROLES.PATH);
    }
  })();
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
    icon: <GoogleMaterialIcons iconName="people" />,
    label: "Roles",
  },
  {
    icon: <GoogleMaterialIcons iconName="note_alt" />,
    label: "Details",
  },
];
