// import jwt from "jsonwebtoken";

// const adminAuth = (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Forbidden: Admins only" });
//     }

//     req.user = decoded;
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default adminAuth;

// const authHeader = req.headers['authorization'] || req.headers['token'];
// if (!authHeader) {
//   return res.status(401).json({ success: false, message: "No token provided" });
// }

// const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;




import jwt from "jsonwebtoken";

const adminAuth = (req,res,next) => {
  try {
      const { token } = req.headers;
      if (!token) {
        return res.json({ success: false, message: "Not authorized, login again" });
      }
      const token_decode = jwt.verify(token,process.env.JWT_SECRET);
      if (token_decode!==process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
        return res.json({ success: false, message: "Not authorized, login again" });
      }
      next();
  }catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;



