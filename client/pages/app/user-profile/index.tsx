import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { PageWrap } from "../../../components/PageWrap";
import { Tag, TAG_TYPES } from "../../../components/tag/Tag";
import { utilBSGetAccessTokenDetails } from "../../../utils/browserStorage";
import { useZSBreadcrumbRef } from "../../../utils/store";

const UserProfile = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const accessTokenDetails: any = utilBSGetAccessTokenDetails();
  const roleLabel = accessTokenDetails?.rolesID?.label;
  const rights = accessTokenDetails?.rolesID?.rightsID;

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
          <div
            className={`
              uppercase font-bold tracking-widest text-xl
              text-surface-light-3 dark:text-surface-dark-3
            `}
          >
            {accessTokenDetails?.username} : {roleLabel}
          </div>
        </div>
      </div>

      <div
        className={`
          mx-4 mt-12 space-y-2 text-lg border p-4 rounded border-surface-light-3 dark:border-surface-dark-3
        `}
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

      <hr className="mx-4 mt-6 border border-surface-light-3 dark:border-surface-dark-3" />

      <div className={` text-lg p-4 rounded `}>
        {rights?.map((right: any) => (
          <Tag
            key={right._id}
            className={`mb-2 mr-2`}
            type={
              right?.name?.indexOf("create") >= 0
                ? TAG_TYPES.INFO
                : right?.name?.indexOf("read") >= 0
                ? TAG_TYPES.SUCCESS
                : right?.name?.indexOf("update") >= 0
                ? TAG_TYPES.WARNING
                : right?.name?.indexOf("delete") >= 0
                ? TAG_TYPES.DANGER
                : TAG_TYPES.DEFAULT
            }
          >
            {right?.label}
          </Tag>
        ))}
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
