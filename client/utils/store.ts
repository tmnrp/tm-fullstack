import create from "zustand";
import { IBreadcrumbsMethods } from "@tmnrp/react-breadcrumbs";
import { RefObject } from "react";
import { DEFAULT_TOKENS, utilBSGetTokens } from "./browserStorage";

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
  tokens: any;
  setTokens: (user: any) => void;
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
  tokens: utilBSGetTokens(),
  setTokens: (tokens) => set(() => ({ tokens })),
  revokeTokens: () => set(() => ({ tokens: DEFAULT_TOKENS })),
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
export const useZSTokens = () => useZStore((state) => state.tokens);
export const useZSSetTokens = () => useZStore((state) => state.setTokens);
export const useZSRevokeTokens = () => useZStore((state) => state.revokeTokens);
