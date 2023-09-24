import jwt from "jsonwebtoken";

export function checkToken(req, resp, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return resp.status(401).send({ message: "Acesso negado." });

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret);

    next();
  } catch (error) {
    resp.status(400).send({ message: "Token inválido." });
  }
}

export const generateToken = (id, email) => {
  const secret = process.env.SECRET;
  const token = jwt.sign({ id, email }, secret, {
    expiresIn: "1h",
  });
  return token;
};

export const generateRefreshToken = (id, email) => {
  const refreshSecret = process.env.REFRESH_SECRET;
  const refreshToken = jwt.sign({ id, email }, refreshSecret, {
    expiresIn: "3h",
  });
  return refreshToken;
};

export const verifyRefreshToken = (token) => {
  try {
    const refreshSecret = process.env.REFRESH_SECRET;
    const decoded = jwt.verify(token, refreshSecret);
    return decoded;
  } catch (error) {
    return null;
  }
};
