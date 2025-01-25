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
      res.status(401).json({ errors: "Usuário não existe." });
    }
    console.log(email, password);
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: "Senha incorreta." });
    }
    //user tem acesso a esse metodo pois passei pra ele através do User.findOne, ele acessa esse metodo e manda a senha, que por padrão o valor é "".
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, user });
  }
}

export default new TokenController();
