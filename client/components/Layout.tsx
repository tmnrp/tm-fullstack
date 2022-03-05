import { useRouter } from "next/router";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { SidebarToggler, Sidebar } from "@tmnrp/react-sidebar";
import { Explorer } from "@tmnrp/react-explorer";
import { CONST_LOGO, CONST_PAGES } from "../constants";
import { getExplorerContent } from "../pages/_app";
import {
  useZustantStoreIsExpanded,
  useZustantStoreToggle,
} from "../utils/store";

//
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isExpanded = useZustantStoreIsExpanded();
  const toggle = useZustantStoreToggle();

  //
  return (
    <div
      className={`
        flex flex-col 
        text-default bg-default
        h-screen
      `}
    >
      <Header
        className={`sticky top-0 z-10 flex justify-between py-4 pl-4 pr-2 border-b dark:border-gray-700`}
        isExpanded={isExpanded}
        toggle={toggle}
      />

      <section className="flex flex-1 overflow-auto relative">
        <Sidebar
          className={`
          pt-4 h-full bg-surface-light-1 dark:bg-surface-dark-1
            ${isExpanded ? "w-10/12 sm:w-60" : ""}
            absolute sm:static
          `}
          isExpandedWidth="250px"
          isExpanded={isExpanded}
        >
          <Explorer
            items={getExplorerContent({ router })}
            afterOnClick={({ e, props }) => toggle()}
          />
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
}) => (
  <header className={className}>
    <div className="flex">
      <SidebarToggler
        className="pr-2"
        toggle={toggle}
        isExpanded={isExpanded}
        isExpandedIcon={<GoogleMaterialIcons iconName="menu_open" />}
        isCollapsedIcon={<GoogleMaterialIcons iconName="menu" />}
      />
      <Logo />
    </div>

    <div className="flex">
      <ThemeSwitcher />
    </div>
  </header>
);

//
const Logo = () => {
  const router = useRouter();

  //
  return (
    <div
      className={`
        text-xl font-extrabold tracking-widest cursor-pointer dark:text-gray-300
        ${
          router.pathname === CONST_PAGES.APP.HOME.PATH
            ? "text-emerald-600"
            : ""
        }
      `}
      onClick={() => router.push(CONST_PAGES.APP.HOME.PATH)}
    >
      {CONST_LOGO}
    </div>
  );
};

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
