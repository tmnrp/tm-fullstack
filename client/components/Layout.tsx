import { useRouter } from "next/router";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { SidebarToggler, Sidebar } from "@tmnrp/react-sidebar";
import { Explorer } from "@tmnrp/react-explorer";
import { CONST_LOGO, CONST_PAGES } from "../constants";
import { getExplorerContent } from "../pages/_app";
import {
  useZSIsExpanded,
  useZSToggle,
  useZSRevokeTokenss,
  useZSAccessToken,
  useZSSetProgressbarRef,
} from "../utils/store";
import { Button } from "./button/Button";
import {
  utilBSGetAccessTokenDetails,
  utilBSSignOutUser,
} from "../utils/browserStorage";
import { useEffect, useRef } from "react";
import { validateTokens } from "../utils/tokenManagement";
import Link from "next/link";
import { IProgressbarMethods, Progressbar } from "@tmnrp/react-progressbar";
import { useHOCIsMounted } from "../hooks/hocIsMounted";

//
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isMounted } = useHOCIsMounted();
  const isExpanded = useZSIsExpanded();
  const toggle = useZSToggle();

  //
  const progressbarRef = useRef<IProgressbarMethods>(null);
  const setProgressbarRef = useZSSetProgressbarRef();
  useEffect(() => setProgressbarRef(progressbarRef), [setProgressbarRef]);

  //
  return (
    <div
      className={`
        flex flex-col 
        text-default bg-default
        h-screen
      `}
    >
      <Progressbar
        ref={progressbarRef}
        className="z-20 bg-red-400 rounded-r-full"
        frequency={100}
        height={5}
      />
      <Header
        className={`sticky top-0 z-10 flex justify-between py-4 pl-4 pr-2 border-b dark:border-gray-700`}
        isExpanded={isExpanded}
        toggle={toggle}
      />

      <section className="flex flex-1 overflow-auto relative">
        <Sidebar
          className={`
            z-10 pt-4 h-full bg-surface-light-1 dark:bg-surface-dark-1
            ${isExpanded ? "w-10/12 sm:w-60" : ""}
            absolute sm:static
          `}
          isExpandedWidth="250px"
          isExpanded={isExpanded}
        >
          {isMounted && (
            <Explorer
              className="flex flex-col space-y-2 pl-4"
              items={getExplorerContent()}
              wrapperHOC={({ cmp, url }) =>
                url ? <Link href={url}>{cmp}</Link> : cmp
              }
              commonItemProps={{
                className:
                  "flex space-x-2 mb-1 hover:text-primary whitespace-nowrap",
                onClick: toggle,
              }}
            />
          )}
        </Sidebar>

        <main className="flex-1 overflow-hidden bg-surface-light-2 dark:bg-surface-dark-2">
          {children}
        </main>
      </section>

      <Footer className="flex justify-between px-2.5 py-2 shadow-inner-default" />
    </div>
  );
};

//
const Header = ({
  className,
  isExpanded,
  toggle,
}: {
  className: string;
  isExpanded: boolean;
  toggle: () => void;
}) => {
  //
  const accessToken = useZSAccessToken();
  useEffect(() => {
    (async () => {
      await validateTokens();
    })();
  }, []);

  //
  const router = useRouter();
  const revokeTokens = useZSRevokeTokenss();
  const accessTokenDetails: any = utilBSGetAccessTokenDetails();

  //
  return (
    <header className={className}>
      <div className="flex">
        {accessToken && (
          <SidebarToggler
            className="pr-2"
            toggle={toggle}
            isExpanded={isExpanded}
            isExpandedIcon={<GoogleMaterialIcons iconName="menu_open" />}
            isCollapsedIcon={<GoogleMaterialIcons iconName="menu" />}
          />
        )}
        <Logo />
      </div>

      <div className="flex">
        <div className="mr-2">
          {accessToken ? (
            <div className="flex items-center space-x-2">
              {accessTokenDetails && (
                <Link href={CONST_PAGES.APP.USER_PROFILE.PATH}>
                  <a
                    className={`
                  text-primary text-lg uppercase tracking-widest font-semibold
                    cursor-pointer
                  `}
                  >
                    {accessTokenDetails?.firstName}
                  </a>
                </Link>
              )}

              <Button
                key={`logout-${accessToken}`}
                className={`button px-2 warning`}
                onClick={() => utilBSSignOutUser({ router, revokeTokens })}
              >
                <GoogleMaterialIcons className="text-lg" iconName="logout" />
                <p className="hidden md:block uppercase text-sm">logout</p>
              </Button>
            </div>
          ) : (
            <Button
              key={`login-${accessToken}`}
              className={`button px-2 success`}
              onClick={() => router.push(CONST_PAGES.AUTH.LOGIN.PATH)}
            >
              <GoogleMaterialIcons className="text-lg" iconName="login" />
              <span className="hidden md:block uppercase text-sm">login</span>
            </Button>
          )}
        </div>

        <ThemeSwitcher />
      </div>
    </header>
  );
};

//
const Logo = () => (
  <Link href={CONST_PAGES.APP.HOME.PATH}>
    <a className="text-xl font-extrabold tracking-widest cursor-pointer">
      {CONST_LOGO}
    </a>
  </Link>
);

//
const Footer = ({ className }: { className: string }) => (
  <footer className={className}>
    <div className="flex space-x-3">
      <div className="flex space-x-2 cursor-pointer text-default-hover">
        <GoogleMaterialIcons iconName="email" />
        <div
          className="hidden md:block whitespace-nowrap"
          onClick={() => window.open("mailto:harsh.harish1@gmail.com")}
        >
          harsh.harish1@gmail.com
        </div>
      </div>

      <div className="flex space-x-2 cursor-pointer text-default-hover">
        <GoogleMaterialIcons iconName="phone" />
        <div
          className="hidden md:block whitespace-nowrap"
          onClick={() => window.open("tel:+917208463103")}
        >
          +91-7208463103
        </div>
      </div>

      <div className="flex space-x-2 cursor-pointer text-default-hover">
        <GoogleMaterialIcons iconName="place" />
        <div
          className="hidden md:block whitespace-nowrap"
          onClick={() =>
            window.open("https://goo.gl/maps/yxYCV2Pt45uzAVUs5", "_blank")
          }
        >
          Dombivli
        </div>
      </div>
    </div>

    <div className="flex space-x-3">
      <GoogleMaterialIcons
        className="cursor-pointer text-default-hover"
        iconName="work"
        onClick={() =>
          window.open(
            "https://www.linkedin.com/in/harsh-parammal-0a831a50/",
            "_blank"
          )
        }
      />
      <GoogleMaterialIcons
        className="cursor-pointer text-default-hover"
        iconName="developer_mode"
        onClick={() => window.open("https://github.com/tmnrp", "_blank")}
      />
    </div>
  </footer>
);
