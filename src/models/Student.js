import Sequelize, { Model } from "sequelize";
export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
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
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
            isInt: {
              msg: "Insira um número inteiro.",
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: false,
          validate: {
            isFloat: {
              msg: "Use ponto ao invés de virgula.",
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
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
