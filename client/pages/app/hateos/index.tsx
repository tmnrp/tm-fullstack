import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { Button } from "../../../components/button/Button";
import { PageWrap } from "../../../components/PageWrap";
import { withAuth } from "../../../hocs/withAuth";
import { useZSBreadcrumbRef } from "../../../utils/store";

const Hateos = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  return (
    <PageWrap className="px-2">
      <Button.Add>Create</Button.Add>
      <Button>Read</Button>
      <Button>Update</Button>
      <Button>Delete</Button>
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
