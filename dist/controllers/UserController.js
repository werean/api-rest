"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _User = require("../models/User");
var _User2 = _interopRequireDefault(_User);
class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, name, email } = newUser;
      res.json(newUser);
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async index(req, res) {
    try {
      const users = await _User2.default.findAll({
        attributes: ["id", "name", "email"],
      });
      return res.json(users);
    } catch (e) {
      return res.json(e);
    }
  }
  async show(req, res) {
    try {
      const users = await _User2.default.findByPk(req.userId);
      const { id, name, email } = users;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(e);
    }
  }

  async update(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
      const newData = await user.update(req.body);
      const { id, name, email } = newData;
      res.json(newData);
    } catch (e) {
      res.json(e);
    }
  }
  async delete(req, res) {
    try {
      const user = await _User2.default.findByPk(req.userId);
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

exports.default = new UserController();
