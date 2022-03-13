import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { useEffect, useState } from "react";
import { APIHateosGet } from "../../../api/hateos";
import { Button } from "../../../components/button/Button";
import { PageWrap } from "../../../components/PageWrap";
import { withAuth } from "../../../hocs/withAuth";
import { useZSBreadcrumbRef } from "../../../utils/store";

const Hateos = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const [rights, setRights] = useState();

  //
  useEffect(() => {
    (async () => {
      const res = await APIHateosGet();
      setRights(res?.data?.items);
    })();
  }, []);

  //
  return (
    <PageWrap className="px-2">
      <div className="flex justify-center space-x-2">
        {rights?.["hateos-create"] && <Button.Add label="Create" />}

        {rights?.["hateos-read"] && <Button.View label="Read" />}

        {rights?.["hateos-update"] && <Button.Edit label="Update" />}

        {rights?.["hateos-delete"] && <Button.Delete label="Delete" />}
      </div>
    </PageWrap>
  );
};

export default withAuth(Hateos);

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="interests" />,
    label: "HATEOS",
  },
  {
    icon: <GoogleMaterialIcons iconName="view_list" />,
    label: "Overview",
  },
];
