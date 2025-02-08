"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);

class HomeController {
  async index(req, res) {
    try {
      return res.json({
        message: "Welcome to School API",
      });
    } catch (e) {
      return res.status(400).json({
        errors: ["Error occurred"],
      });
    }
  }
}

exports. default = new HomeController();
