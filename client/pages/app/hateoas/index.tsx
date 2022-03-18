import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { useEffect, useState } from "react";
import { APIHateoasGet } from "../../../api/hateoas";
import { Button } from "../../../components/button/Button";
import { PageWrap } from "../../../components/PageWrap";
import { withAuth } from "../../../hocs/withAuth";
import { useZSBreadcrumbRef } from "../../../utils/store";

const Hateoas = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const [rights, setRights] = useState();

  //
  useEffect(() => {
    (async () => {
      const res = await APIHateoasGet();
      setRights(res?.data?.items);
    })();
  }, []);

  //
  return (
    <PageWrap className="px-2">
      <div className="flex justify-center space-x-2">
        {rights?.["hateoas-create"] && <Button.Add label="Create" />}

        {rights?.["hateoas-read"] && <Button.View label="Read" />}

        {rights?.["hateoas-update"] && <Button.Edit label="Update" />}

        {rights?.["hateoas-delete"] && <Button.Delete label="Delete" />}
      </div>
    </PageWrap>
  );
};

export default withAuth(Hateoas);

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="interests" />,
    label: "HATEOAS",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Overview",
  },
];
