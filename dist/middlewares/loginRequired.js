"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _jsonwebtoken = require("jsonwebtoken");
var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require("../models/User");
var _User2 = _interopRequireDefault(_User);

exports.default = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: ["Login requerido."] });
  }

  const [text, token] = authorization.split(" ");

  try {
    const data = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);

    const { id, email } = data;
    const user = await _User2.default.findOne({
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
