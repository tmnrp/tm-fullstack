/* eslint-disable @next/next/no-img-element */
import md5 from "md5";
import { ICrumb, useBreadcrumbs } from "@tmnrp/react-breadcrumbs";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { PageWrap } from "../../../components/PageWrap";
import { Tag, TAG_TYPES } from "../../../components/tag/Tag";
import { utilBSGetAccessTokenDetails } from "../../../utils/browserStorage";
import { useZSBreadcrumbRef, useZSThemeMode } from "../../../utils/store";
import { Button } from "../../../components/button/Button";
import { withAuth } from "../../../hocs/withAuth";

const UserProfile = () => {
  //
  const breadcrumbRef = useZSBreadcrumbRef();
  useBreadcrumbs({ ref: breadcrumbRef, crumbs });

  //
  const accessTokenDetails: any = utilBSGetAccessTokenDetails();
  const roleLabel = accessTokenDetails?.rolesID?.label;
  const rights = accessTokenDetails?.rolesID?.rightsID;
  const email = accessTokenDetails?.email || "";

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
          <img
            alt=""
            className={`
              flex items-center justify-center
              h-28 sm:h-32 w-28 sm:w-32
              bg-surface-light-1 dark:bg-surface-dark-1
              rounded-full shadow-lg
            `}
            src={`https://www.gravatar.com/avatar/${md5(email)}?d=retro`}
          />
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
          mx-4 mt-12 px-4 py-2 space-y-4 text-lg rounded 
          border border-surface-light-3 dark:border-surface-dark-3
        `}
      >
        <div>
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

        <hr />

        <div>
          <span className="inline-flex w-24 font-semibold tracking-wide mr-2">
            Theme:
          </span>
          <span className="inline-flex space-x-2 uppercase font-semibold tracking-widest">
            <Button className="px-2 py-1 bg-surface-light-1 text-surface-dark-1">
              LIGHT
            </Button>
            <Button className="px-2 py-1 bg-surface-dark-1 text-surface-light-1">
              DARK
            </Button>
          </span>
        </div>

        <hr />

        <div className={` text-lg rounded `}>
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
      </div>
    </PageWrap>
  );
};

export default withAuth(UserProfile);

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
