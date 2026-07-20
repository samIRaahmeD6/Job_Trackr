import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
    
  );
  console.log("AUTH HEADER:", req.headers.authorization);
};


export default generateToken;