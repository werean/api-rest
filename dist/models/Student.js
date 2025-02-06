"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var _sequelize = require("sequelize");
var _sequelize2 = _interopRequireDefault(_sequelize);
class Student extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          allowNull: false,
          validate: {
            len: {
              args: [3, 100],
              msg: "Nome precisa ter entre 3 e 100 caracteres",
            },
          },
        },
        surname: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          allowNull: true,
          validate: {
            len: {
              args: [3, 100],
              msg: "Sobrenome precisa ter entre 3 e 100 caracteres",
            },
          },
        },
        email: {
          type: _sequelize2.default.STRING,
          allowNull: false,
          unique: {
            msg: "E-mail já existe.",
          },
          validate: {
            isEmail: {
              msg: "E-mail invalido.",
            },
          },
        },
        age: {
          type: _sequelize2.default.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: "Insira um número inteiro.",
            },
          },
        },
        height: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: "Use ponto ao invés de virgula.",
            },
          },
        },
        weight: {
          type: _sequelize2.default.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: "Use ponto ao invés de virgula",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.hasMany(models.Photo, { foreignKey: "student_id" });
  }
}
exports.default = Student;
