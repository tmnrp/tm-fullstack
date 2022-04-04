import create from "zustand";
import { IBreadcrumbsMethods } from "@tmnrp/react-breadcrumbs";
import { RefObject } from "react";
import { IProgressbarMethods } from "@tmnrp/react-progressbar";

//
interface IGlobalState {
  isExpanded: boolean;
  toggle: () => void;

  //
  themeMode: string;
  setThemeMode: (themeMode: string) => void;

  //
  progressbarRef: React.RefObject<IProgressbarMethods> | undefined;
  setProgressbarRef: (
    breadcrumbRef: React.RefObject<IProgressbarMethods>
  ) => void;

  //
  breadcrumbRef: React.RefObject<IBreadcrumbsMethods> | undefined;
  setBreadcrumbRef: (
    breadcrumbRef: React.RefObject<IBreadcrumbsMethods>
  ) => void;

  //
  accessToken: string;
  setAccessToken: (user: any) => void;
  revokeTokens: () => void;
}

//
export const useZStore = create<IGlobalState>((set: any) => {
  //
  return {
    isExpanded: true,
    toggle: () =>
      set((state: IGlobalState) => ({ isExpanded: !state.isExpanded })),

    //
    themeMode: "dark",
    setThemeMode: (themeMode: string) => set(() => ({ themeMode })),

    //
    progressbarRef: undefined,
    setProgressbarRef: (progressbarRef: RefObject<IProgressbarMethods>) =>
      set(() => ({ progressbarRef })),

    //
    breadcrumbRef: undefined,
    setBreadcrumbRef: (breadcrumbRef: RefObject<IBreadcrumbsMethods>) =>
      set(() => ({ breadcrumbRef })),

    //
    accessToken: "",
    setAccessToken: (accessToken) => set(() => ({ accessToken })),
    revokeTokens: () => set(() => ({ accessToken: "", refreshToken: "" })),
  };
});

//
export const useZSIsExpanded = () => useZStore((state) => state.isExpanded);
export const useZSToggle = () => useZStore((state) => state.toggle);

//
export const useZSThemeMode = () => useZStore((state) => state.themeMode);
export const useZSSetThemeMode = () => useZStore((state) => state.setThemeMode);

//
export const useZSProgressbarRef = () =>
  useZStore((state) => state.progressbarRef);
export const useZSSetProgressbarRef = () =>
  useZStore((state) => state.setProgressbarRef);

//
export const useZSBreadcrumbRef = () =>
  useZStore((state) => state.breadcrumbRef);
export const useZSSetBreadcrumbRef = () =>
  useZStore((state) => state.setBreadcrumbRef);

//
export const useZSAccessToken = () => useZStore((state) => state.accessToken);
export const useZSSetAccessToken = () =>
  useZStore((state) => state.setAccessToken);
export const useZSRevokeTokenss = () =>
  useZStore((state) => state.revokeTokens);
