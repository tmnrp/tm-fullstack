import * as Yup from "yup";
import { Form, Formik } from "formik";
import router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useBreadcrumbs, ICrumb } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { AxiosRequest } from "../../../../api";
import {
  APIRightsGetById,
  APIRightsPost,
  APIRightsPut,
  IRights,
} from "../../../../api/security/APIRights";
import { Button } from "../../../../components/button/Button";
import { PageWrap } from "../../../../components/PageWrap";
import { CONST_PAGE_MODE, CONST_PAGES } from "../../../../constants";
import { useZustantStoreBreadcrumbRef } from "../../../../utils/store";

//
const RightDetails = () => {
  const breadcrumbRef = useZustantStoreBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const router = useRouter();
  const id = router.query.id;
  const isNewPage = id === CONST_PAGE_MODE.NEW;

  //
  const [rightDetails, setRightDetails] = useState<IRights>();
  useEffect(() => {
    if (id && !isNewPage) {
      APIRightsGetById(
        `${id}`,
        (res) =>
          !AxiosRequest.isAxiosError(res) && setRightDetails(res?.data?.items)
      );
    }
  }, [id, isNewPage]);

  //
  return (
    <PageWrap
      actions={
        <div className="flex space-x-2">
          <Button.Cancel
            onClick={() => router.push(CONST_PAGES.APP.SECURITY.RIGHTS.PATH)}
          />

          <Button.Save form="form" type="submit" />
        </div>
      }
    >
      <Formik
        key={`key-${rightDetails}`}
        validationSchema={validationSchema}
        initialValues={{ name: rightDetails?.name || "" }}
        onSubmit={(values: IRights) =>
          submitHandler({ id: `${id}`, isNewPage, values })
        }
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
              <div className="tracking-widest">Right</div>
              <input
                className="tm-input"
                type="search"
                name="name"
                placeholder="Enter name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />

              <span className="text-sm text-red-700">
                {errors.name && touched.name && errors.name}
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </PageWrap>
  );
};
export default RightDetails;

//
const submitHandler = ({
  id,
  isNewPage,
  values,
}: {
  id: string;
  isNewPage: boolean;
  values: IRights;
}) => {
  if (isNewPage) {
    APIRightsPost({ ...values }, (res) => {
      if (!AxiosRequest.isAxiosError(res)) {
        toast.success(`Successfully created right ${values.name}`);
        router.push(CONST_PAGES.APP.SECURITY.RIGHTS.PATH);
      }
    });
  } else {
    id &&
      APIRightsPut(id, values, (res) => {
        if (!AxiosRequest.isAxiosError(res)) {
          toast.success(`Successfully updated right ${values.name}`);
          router.push(CONST_PAGES.APP.SECURITY.RIGHTS.PATH);
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
    label: "Rights",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Details",
  },
];
