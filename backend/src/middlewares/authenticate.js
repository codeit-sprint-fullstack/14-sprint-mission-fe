import { expressjwt } from "express-jwt";

const authenticate = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const optionalAuthenticate = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  credentialsRequired: false,
});

export default authenticate;
