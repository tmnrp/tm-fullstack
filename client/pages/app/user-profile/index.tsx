import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { PageWrap } from "../../../components/PageWrap";
import { utilBSGetAccessTokenDetails } from "../../../utils/browserStorage";
import { useZSBreadcrumbRef } from "../../../utils/store";

const UserProfile = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const accessTokenDetails: any = utilBSGetAccessTokenDetails();

  //
  return (
    <PageWrap>
      <div
        className={`
          relative h-24 sm:h-28 bg-emerald-900
        `}
      >
        <div
          className={`
            absolute -bottom-8 left-10
            flex items-center space-x-4
          `}
        >
          <div
            className={`
              flex items-center justify-center
              h-28 sm:h-32 w-28 sm:w-32
              bg-surface-light-1 dark:bg-surface-dark-1
              rounded-full shadow-lg
            `}
          >
            Profile
          </div>
          <div className="uppercase font-bold tracking-widest text-xl">
            {accessTokenDetails?.username}
          </div>
        </div>
      </div>

      <div
        className={`mx-4 mt-12 space-y-2 text-lg border p-4 rounded border-surface-dark-3`}
      >
        <div>
          <span className="inline-flex w-24 font-semibold tracking-wide mr-2">
            Sur name:
          </span>
          <span className="uppercase font-semibold tracking-widest">
            {accessTokenDetails?.surName}
          </span>
        </div>

        <div>
          <span className="inline-flex w-24 font-semibold tracking-wide mr-2">
            First name:
          </span>
          <span className="uppercase font-semibold tracking-widest">
            {accessTokenDetails?.firstName}
          </span>
        </div>

        <div>
          <span className="inline-flex w-24 font-semibold tracking-wide mr-2">
            Last name:
          </span>
          <span className="uppercase font-semibold tracking-widest">
            {accessTokenDetails?.lastName}
          </span>
        </div>
      </div>
    </PageWrap>
  );
};

export default UserProfile;

//
const crumbs: Array<ICrumb> = [
  {
    icon: <GoogleMaterialIcons iconName="home" />,
    label: "Home",
  },
  {
    icon: <GoogleMaterialIcons iconName="account_circle" />,
    label: "User profile",
  },
];
