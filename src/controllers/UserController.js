import User from "../models/User";
class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async index(req, res) {
    // index mostra todos os usuários
    // sempre que for usar async envolver o bloco por um trycatch para caso tenha erro
    try {
      const users = await User.findAll({ attributes: ["id", "name", "email"] }); // isso vai retonar todos os usuários na base de dados. attributes serve para definir o que será mostrado
      console.log("USER ID", req.userId);
      console.log("USER EMAIL", req.userEmail);
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }
  async show(req, res) {
    // show mostra apenas um usuario
    try {
      const users = await User.findByPk(req.userId); //aqui estou buscando pela primarykey(id)
      const { id, name, email } = users; // verificar para que serve isso depois
      console.log(users, "aqui está o users");
      return res.json({ id, name, email }); // verificar para que serve isso depois
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId); //aqui faz com que eu edite apenas o usuário que está com o token ativo, ou seja, se eu estou com o token da conta X eu vou editar apenas a conta X
      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      res.json(newData);
    } catch (e) {
      res.json(e);
    }
  }
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);
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
