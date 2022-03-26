import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { useEffect } from "react";
import { APIUsersPutSettings } from "../api/security/APIUsers";
import {
  utilBSGetAccessTokenDetails,
  utilBSGetUserSettings,
} from "../utils/browserStorage";
import { useZSSetThemeMode, useZSThemeMode } from "../utils/store";

//
export const CONST_THEME_MODES = {
  DARK: "dark",
  LIGHT: "light",
};

//
export const ThemeSwitcher = () => {
  const themeMode = useZSThemeMode();
  const setThemeMode = useZSSetThemeMode();

  //
  useEffect(() => {
    const el = document.getElementById("__next");
    themeMode === CONST_THEME_MODES.DARK &&
      el?.classList.add(CONST_THEME_MODES.DARK);
    themeMode === CONST_THEME_MODES.LIGHT &&
      el?.classList.remove(CONST_THEME_MODES.DARK);
  }, [themeMode]);

  //
  return (
    <div
      className="flex items-center px-1 cursor-pointer text-default-hover"
      onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
    >
      <GoogleMaterialIcons
        iconName={`${
          themeMode === CONST_THEME_MODES.LIGHT
            ? "brightness_4"
            : "brightness_7"
        } `}
      />
    </div>
  );
};

//
export const useOnThemeChange = () => {
  const themeMode = useZSThemeMode();

  //
  useEffect(() => {
    (async () => {
      const userSettings: any = utilBSGetUserSettings();
      const accessTokenDetails: any = utilBSGetAccessTokenDetails();
      if (userSettings.themeMode !== themeMode) {
        const res = await APIUsersPutSettings(accessTokenDetails?._id, {
          themeMode,
        });
      }
    })();
  }, [themeMode]);
};
