//
export const CONST_STORAGE = {
  "access-token": "access-token",
};

//
export const getAccessToken = () =>
  localStorage.getItem(CONST_STORAGE["access-token"]);
