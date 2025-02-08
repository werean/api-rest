"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Student = require('../models/Student'); var _Student2 = _interopRequireDefault(_Student);
var _Photo = require('../models/Photo'); var _Photo2 = _interopRequireDefault(_Photo);

class StudentController {
  async index(req, res) {
    const getStudents = await _Student2.default.findAll({
      attributes: ["id", "name", "surname", "email", "age", "weight", "height"],
      order: [
        ["id", "DESC"],
        [_Photo2.default, "id", "DESC"],
      ],
      include: {
        model: _Photo2.default,
        attributes: ["id", "originalname", "filename", "student_id", "url"],
      },
    });
    res.json(getStudents);
  }
  async store(req, res) {
    try {
      const student = await _Student2.default.create(req.body);
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }
      const student = await _Student2.default.findByPk(id, {
        attributes: [
          "id",
          "name",
          "surname",
          "email",
          "age",
          "weight",
          "height",
        ],
        order: [
          ["id", "DESC"],
          [_Photo2.default, "id", "DESC"],
        ],
        include: {
          model: _Photo2.default,
          attributes: ["id", "originalname", "filename", "student_id", "url"],
        },
      });
      if (!student) {
        return res.status(400).json({
          errors: ["Esse aluno não existe."],
        });
      }
      return res.json(student);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }
      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ["Esse aluno não existe."],
        });
      }
      await student.destroy();
      return res.json(`Você deletou: ${student}`);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ["Faltando ID"],
        });
      }
      const student = await _Student2.default.findByPk(id);
      if (!student) {
        return res.status(400).json({
          errors: ["Esse aluno não existe."],
        });
      }
      const updatedStudent = await student.update(req.body);
      return res.json(updatedStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
exports. default = new StudentController();
