import Sequelize, { Model } from "sequelize";
export default class Student extends Model {
  // Define e exporta a classe Student que estende a classe Model
  static init(sequelize) {
    // Método estático init que recebe uma instância do Sequelize
    super.init(
      // Chama o método init da classe pai (Model)
      {
        // Define os atributos do modelo Student
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
        // Opções adicionais para o modelo
        sequelize, // Passa a instância do Sequelize
      }
    ); // Fecha a chamada do método init da classe pai
    return this; // Retorna a própria classe Student
  }
} // Fecha a definição da classe Student

// Este arquivo define um modelo Student para ser usado com o ORM Sequelize, especificando os atributos e suas tipagens.
