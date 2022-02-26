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
}

//
const useZustantStore = create<IGlobalState>((set: any) => ({
  isExpanded: true,
  toggle: () =>
    set((state: IGlobalState) => ({ isExpanded: !state.isExpanded })),

  //
  themeMode: "dark",
  setThemeMode: (themeMode: string) => set(() => ({ themeMode })),

  //
  breadcrumbRef: undefined,
  setBreadcrumbRef: (breadcrumbRef: RefObject<IBreadcrumbsMethods>) =>
    set(() => ({ breadcrumbRef })),
}));

//
export const useZustantStoreIsExpanded = () =>
  useZustantStore((state) => state.isExpanded);

//
export const useZustantStoreToggle = () =>
  useZustantStore((state) => state.toggle);

//
export const useZustantStoreThemeMode = () =>
  useZustantStore((state) => state.themeMode);

//
export const useZustantStoreSetThemeMode = () =>
  useZustantStore((state) => state.setThemeMode);

//
export const useZustantStoreBreadcrumbRef = () =>
  useZustantStore((state) => state.breadcrumbRef);

//
export const useZustantStoreSetBreadcrumbRef = () =>
  useZustantStore((state) => state.setBreadcrumbRef);
