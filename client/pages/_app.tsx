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
import { useZustantStoreSetBreadcrumbRef } from "../utils/store";

const App = ({ Component, pageProps }: AppProps) => {
  const breadcrumbRef = useRef<IBreadcrumbsMethods>(null);
  const setBreadcrumbRef = useZustantStoreSetBreadcrumbRef();
  useEffect(() => setBreadcrumbRef(breadcrumbRef), [setBreadcrumbRef]);

  //
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
          rel="stylesheet"
        />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
};

export default App;

//
export const getExplorerContent = ({
  router,
}: {
  router: NextRouter;
}): Array<IExplorerItem> => [
  {
    icon: <GoogleMaterialIcons iconName="manage_accounts" />,
    label: "Manage",
    clickable: false,
    items: [
      {
        label: "Users",
        icon: <GoogleMaterialIcons iconName="people" />,
        itemProps: {
          className: "hover:text-primary cursor-pointer",
          onClick: () => router.push(CONST_PAGES.SECURITY.USERS.PATH),
        },
      },
    ],
  },
];
