import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: ["Login requerido."] });
  }

  const [text, token] = authorization.split(" ");

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = data;
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      res.json({ errors: ["Usuário inválido."] });
    }

    req.userId = id;

    req.userEmail = email;

    next();
  } catch (e) {
    return res.status(401).json({ error: ["Token expirou."] });
  }
};
