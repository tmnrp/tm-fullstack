import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { useState } from "react";
import { PageWrap } from "../../../../components/PageWrap";
import { useZSBreadcrumbRef } from "../../../../utils/store";

const Settings = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const [isDarkMode, setIsDarkMode] = useState();

  //
  return (
    <PageWrap className="p-2">
      <div className="flex items-center justify-center">
        <div className="w-full">
          <div className="flex items-center space-y-1 space-x-2">
            <div className="tracking-widest">Dark mode</div>
            <input className="input" type="checkbox" name="isDarkMode" />
          </div>
        </div>
      </div>
    </PageWrap>
  );
};
export default Settings;

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="display_settings" />,
    label: "Settings",
  },
];
