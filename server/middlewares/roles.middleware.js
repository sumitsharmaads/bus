export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || !user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }
    next();
  } catch (error) {
    console.log("[isAdmin Middleware] error", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export const isCaptin = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user || !user.isAdmin || !user.isCaptin) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }
    next();
  } catch (error) {
    console.log("[isCaptin Middleware] error", error);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};
