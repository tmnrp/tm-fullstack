import { GoogleMaterialIcons } from "@tmnrp/react-google-material-icons";
import { useEffect } from "react";
import {
  useZustantStoreSetThemeMode,
  useZustantStoreThemeMode,
} from "../utils/store";

//
export const CONST_THEME_MODES = {
  DARK: "dark",
  LIGHT: "light",
};

//
export const ThemeSwitcher = () => {
  const themeMode = useZustantStoreThemeMode();
  const setThemeMode = useZustantStoreSetThemeMode();

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
