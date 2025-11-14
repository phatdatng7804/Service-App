import jwt from "jsonwebtoken";
import db from "../models";
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token)
      return res.status(401).json({
        err: 1,
        mes: "Missing access token",
      });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.User.findByPk(decoded.id);

    if (!user) return res.status(401).json({ err: 1, mes: "User not found" });
    if (!user.is_active)
      return res.status(403).json({ err: 1, mes: "User is inactive" });

    req.user = {
      id: user.id,
      numberPhone: user.phone_number,
      roleId: user.role_id,
    };
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ err: 1, mes: "Invalid token" });
  }
};
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const roleId = Number(req.user.roleId);
    if (!allowedRoles.includes(roleId)) {
      return res.status(403).json({
        err: 1,
        mes: `Require one of roles: ${allowedRoles.join(", ")}`,
      });
    }
    next();
  };
};
