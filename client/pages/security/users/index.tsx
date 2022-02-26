import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { PageWrap } from "../../../components/PageWrap";
import { useZustantStoreBreadcrumbRef } from "../../../utils/store";

//
const Users = () => {
  const breadcrumbRef = useZustantStoreBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs: crumbs });

  //
  return <PageWrap className="px-2">Welcome user</PageWrap>;
};
export default Users;

const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="badge" />,
    label: "Security",
  },
  {
    icon: <GoogleMaterialIcons iconName="people" />,
    label: "Users",
  },
  {
    icon: <GoogleMaterialIcons iconName="grid_view" />,
    label: "Overview",
  },
];
