/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-page-custom-font */
import "../styles/globals.css";
import { IExplorerItem } from "@tmnrp/react-explorer";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { AppProps } from "next/app";
import Head from "next/head";
import { NextRouter } from "next/router";
import { Layout } from "../components/Layout";
import { CONST_PAGES } from "../constants";
import { IBreadcrumbsMethods } from "@tmnrp/react-breadcrumbs";
import { useEffect, useRef } from "react";
import { useZSSetBreadcrumbRef, useZSThemeMode } from "../utils/store";
import {
  useSyncBSToZS,
  utilBSGetAccessTokenDetails,
  utilBSGetUserSettings,
  utilBSSetUserSettings,
} from "../utils/browserStorage";
import { APIUsersPutSettings } from "../api/security/APIUsers";
import axios from "axios";

//
const _App = ({ Component, pageProps }: AppProps) => {
  //
  useSyncBSToZS();

  //
  const breadcrumbRef = useRef<IBreadcrumbsMethods>(null);
  const setBreadcrumbRef = useZSSetBreadcrumbRef();
  useEffect(() => setBreadcrumbRef(breadcrumbRef), [setBreadcrumbRef]);

  //
  return (
    <Layout>
      <Head>
        <title>TMNRP - Fullstack</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
};

//
export default _App;

//
export const getExplorerContent = ({
  router,
}: {
  router: NextRouter;
}): Array<IExplorerItem> => [
  {
    icon: (
      <GoogleMaterialIcons className="pr-2" iconName="admin_panel_settings" />
    ),
    label: "Hateoas",
    clickable: false,
    itemProps: {
      className: "pb-1.5",
    },
    items: [
      {
        label: "Role based actions",
        icon: <GoogleMaterialIcons className="pr-2" iconName="people" />,
        itemProps: {
          className: "hover:text-primary cursor-pointer pb-1",
          onClick: () => router.push(CONST_PAGES.APP.HATEOAS.PATH),
        },
      },
    ],
  },
  {
    icon: (
      <GoogleMaterialIcons className="pr-2" iconName="admin_panel_settings" />
    ),
    label: "Manage",
    clickable: false,
    itemProps: {
      className: "pb-1.5",
    },
    items: [
      {
        label: "Roles",
        icon: <GoogleMaterialIcons className="pr-2" iconName="people" />,
        itemProps: {
          className: "hover:text-primary cursor-pointer pb-1",
          onClick: () => router.push(CONST_PAGES.APP.SECURITY.ROLES.PATH),
        },
      },
      {
        label: "Users",
        icon: <GoogleMaterialIcons className="pr-2" iconName="badge" />,
        itemProps: {
          className: "hover:text-primary cursor-pointer pb-1",
          onClick: () => router.push(CONST_PAGES.APP.SECURITY.USERS.PATH),
        },
      },
      {
        label: "Righs",
        icon: <GoogleMaterialIcons className="pr-2" iconName="checklist_rtl" />,
        itemProps: {
          className: "hover:text-primary cursor-pointer pb-1",
          onClick: () => router.push(CONST_PAGES.APP.SECURITY.RIGHTS.PATH),
        },
      },
    ],
  },
];
