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
  user: any;
  setUser: (user: any) => void;
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
  user: null,
  setUser: (user) => set(() => ({ user })),
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
export const useZSUser = () => useZStore((state) => state.user);
export const useZSSetUser = (user: any) => useZStore(() => user);
