//
export const CONST_LOGO = "F.Stack";

//
export const CONST_PAGE_MODE = {
  NEW: "new",
  DETAILS: "details",
};

//
export const CONST_PAGES = {
  AUTH: {
    KEY: "/auth",
    LOGIN: {
      KEY: "/auth/login",
      PATH: "/auth/login",
    },
  },
  LANDING: {
    KEY: "/landing",
    PATH: "/landing",
  },
  APP: {
    KEY: "/app",
    HOME: {
      KEY: "/app/home",
      PATH: "/app/home",
    },
    HATEOAS: {
      KEY: "/app/hateoas",
      PATH: "/app/hateoas",
    },
    SECURITY: {
      ROLES: {
        KEY: "/app/security/roles",
        PATH: "/app/security/roles",
      },
      USERS: {
        KEY: "/app/security/users",
        PATH: "/app/security/users",
      },
      RIGHTS: {
        KEY: "/app/security/rights",
        PATH: "/app/security/rights",
      },
    },
  },
};

//
export const CONST_CONFIG_EXCLUDE_PROTECTED_ROUTES = [
  CONST_PAGES.LANDING.KEY,
  CONST_PAGES.AUTH.KEY,
];

//
export const CONST_CONFIG_BASE_URL =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3001/"
    : "https://tm-fullstack.herokuapp.com/";

//
export const CONST_CONFIG_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC6wX2TOVQNNl+LyMIjRffE4r+n
wDSDVvNgRuyZFg5rdp8BZyUwlkP8R/BKubDJgTBXuBCcqRKUsg2ysdZosuarrG5k
ZVS6ZBe6HnAdKh2TTuyGC2TMiz/cP/msOqvpgTmximDnQ503no74THFb/r0TN06A
tuf0GGxFTE+Kk0zrFwIDAQAB
-----END PUBLIC KEY-----`;
