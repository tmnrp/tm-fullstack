import mung from "express-mung";

//
export const injectNewAccessTokenMiddleware = mung.json(function transform(
  body: any,
  req,
  res
) {
  const newAccessToken = res.locals["newAccessToken"];
  newAccessToken && (body.newAccessToken = newAccessToken);

  //
  return body;
});
