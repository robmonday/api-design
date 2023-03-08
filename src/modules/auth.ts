import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//helper function
// comparing plain text password submitted to hash stored in DB
export const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash); // returns a promise
};

//helper function
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

// converting an object to a string to create token (using secret)
export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// receive token convert it back to object (using secret)
// this middleware function can sit in front of any route that must be authenticated
export const protect = (req, res, next) => {
  // gets authorization header from a request
  const bearer = req.headers.authorization;

  // if there is no header, request cannot proceed
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return; // returning instead of calling next() stops request from proceeding to its route function
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    res.status(401);
    res.json({ message: "not authorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = payload; // saving extracted user object into request object
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "token not valid" });
    return;
  }
};
