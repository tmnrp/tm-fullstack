import create from "zustand";
import { IBreadcrumbsMethods } from "@tmnrp/react-breadcrumbs";
import { RefObject } from "react";

//
interface IGlobalState {
  isExpanded: boolean;
  toggle: () => void;

  //
  themeMode: string;
  setThemeMode: (themeMode: string) => void;

  //
  breadcrumbRef: React.RefObject<IBreadcrumbsMethods> | undefined;
  setBreadcrumbRef: (
    breadcrumbRef: React.RefObject<IBreadcrumbsMethods>
  ) => void;

  //
  accessToken: string;
  refreshToken: string;
  setAccessToken: (user: any) => void;
  setRefreshToken: (user: any) => void;
  revokeTokens: () => void;
}

//
export const useZStore = create<IGlobalState>((set: any) => ({
  isExpanded: false,
  toggle: () =>
    set((state: IGlobalState) => ({ isExpanded: !state.isExpanded })),

  //
  themeMode: "dark",
  setThemeMode: (themeMode: string) => set(() => ({ themeMode })),

  //
  breadcrumbRef: undefined,
  setBreadcrumbRef: (breadcrumbRef: RefObject<IBreadcrumbsMethods>) =>
    set(() => ({ breadcrumbRef })),

  //
  accessToken: "",
  refreshToken: "",
  setAccessToken: (accessToken) => set(() => ({ accessToken })),
  setRefreshToken: (refreshToken) => set(() => ({ refreshToken })),
  revokeTokens: () => set(() => ({ accessToken: "", refreshToken: "" })),
}));

//
export const useZSIsExpanded = () => useZStore((state) => state.isExpanded);
export const useZSToggle = () => useZStore((state) => state.toggle);

//
export const useZSThemeMode = () => useZStore((state) => state.themeMode);
export const useZSSetThemeMode = () => useZStore((state) => state.setThemeMode);

//
export const useZSBreadcrumbRef = () =>
  useZStore((state) => state.breadcrumbRef);
export const useZSSetBreadcrumbRef = () =>
  useZStore((state) => state.setBreadcrumbRef);

//
export const useZSAccessToken = () => useZStore((state) => state.accessToken);
export const useZSRefreshToken = () => useZStore((state) => state.refreshToken);
export const useZSSetAccessToken = () =>
  useZStore((state) => state.setAccessToken);
export const useZSSetRefreshToken = () =>
  useZStore((state) => state.setRefreshToken);
export const useZSRevokeTokenss = () =>
  useZStore((state) => state.revokeTokens);
