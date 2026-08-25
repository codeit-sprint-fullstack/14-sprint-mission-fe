import { expressjwt } from "express-jwt";

const authenticate = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export default authenticate;
