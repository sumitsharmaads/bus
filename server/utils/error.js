export const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};

export const invalidSessionError = (
  res,
  next,
  message = "Session expired",
  code = 401
) => {
  res.clearCookie("refreshToken");
  res.clearCookie("uuid");
  return next(createError(code, message));
};
