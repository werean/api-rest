import User from "../models/User";
class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async index(req, res) {
    // sempre que for usar async envolver o bloco por um trycatch para caso tenha erro
    try {
      const users = await User.findAll(); // isso vai retonar todos os usuários na base de dados
      console.log("USER ID",req.userId)
      console.log("USER EMAIL",req.userEmail)
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }
  async show(req, res) {
    try {
      const users = await User.findByPk(req.params.id); //aqui estou buscando pela primarykey(id)
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ["ID não enviado."],
        });
      }
      const user = await User.findByPk(req.params.id);
      const newData = await user.update(req.body);
      res.json(newData);
    } catch (e) {
      res.json(e);
    }
  }
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          erros: ["Usuário não encontrado."],
        });
      }
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuário não existe na base dados."],
        });
      }
      await user.destroy();
      return res.json("Usuário deletado!");
    } catch (e) {}
  }
}

export default new UserController();
