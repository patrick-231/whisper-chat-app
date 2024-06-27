import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    let token;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res
        .status(401)
        .json({ error: "Unauthorized - No Token Provided 401 Error" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ error: "Unauthorized - Token Expired" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware: ", error.message);
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ error: "Unauthorized - Invalid Token Signature" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
