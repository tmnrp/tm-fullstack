import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import axios from "axios";
import { useEffect } from "react";
import { APIUsersPutSettings } from "../api/security/APIUsers";
import {
  utilBSGetAccessTokenDetails,
  utilBSGetUserSettings,
  utilBSSetUserSettings,
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
  console.log({ themeMode });

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
      onClick={() => {
        onThemeChangeHandler({
          themeMode: themeMode === "dark" ? "light" : "dark",
          setThemeMode,
        });
      }}
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
export const onThemeChangeHandler = async ({
  themeMode,
  setThemeMode,
}: any) => {
  const userSettings: any = utilBSGetUserSettings();
  const accessTokenDetails: any = utilBSGetAccessTokenDetails();
  if (accessTokenDetails?._id) {
    const res = await APIUsersPutSettings(accessTokenDetails?._id, {
      settings: { ...userSettings, themeMode },
    });

    if (!axios.isAxiosError(res)) {
      //
      const userSettings: any = utilBSGetUserSettings();
      utilBSSetUserSettings({ ...userSettings, themeMode });

      //
      setThemeMode(themeMode);
    }
  } else {
    setThemeMode(themeMode);
  }
};
