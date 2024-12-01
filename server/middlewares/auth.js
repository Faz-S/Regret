// import jwt from "jsonwebtoken";

// export const authenticate = (req, res, next) => {
//     const token = req.header("Authorization")?.replace("Bearer ", "");
//     if (!token) {
//         return res.status(401).json({ error: "No token provided" });
//     }

//     try {
//         const decoded = jwt.verify(token, "JWT_SECRET");
//         req.user = { id: decoded.userId };
//         next();
//     } catch (error) {
//         res.status(401).json({ error: "Invalid token" });
//     }
// };
import jwt from "jsonwebtoken";
// require('dotenv').config();

export const authenticate = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "JWT_SECRET");
    req.user = decoded;
      // Add the user to the request object (decoded token)
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

