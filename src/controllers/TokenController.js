import User from "../models/User";
import jwt from "jsonwebtoken";

class TokenController {
  async store(req, res) {
    const { email = "", password = "" } = req.body;
    if (!email || !password) {
      return res.status(401).json({ errors: "Insira o e-mail e senha." });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ errors: "Usuário não existe." });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: "Senha incorreta." });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user });
  }
}

export default new TokenController();
