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
    try {
      const users = await User.findAll({ attributes: ["id", "name", "email"] });
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }
  async show(req, res) {
    try {
      const users = await User.findByPk(req.userId);
      const { id, name, email } = users;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
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
