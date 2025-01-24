

import Sequelize, { Model } from "sequelize";
export default class Student extends Model { // Define e exporta a classe Student que estende a classe Model
  static init(sequelize) { // Método estático init que recebe uma instância do Sequelize
    super.init( // Chama o método init da classe pai (Model)
      { // Define os atributos do modelo Student
        name: Sequelize.STRING,
        surname: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        height: Sequelize.FLOAT,
        weight: Sequelize.FLOAT,
      },
      { // Opções adicionais para o modelo
        sequelize, // Passa a instância do Sequelize
      }
    ); // Fecha a chamada do método init da classe pai
    return this; // Retorna a própria classe Student
  }
} // Fecha a definição da classe Student

// Este arquivo define um modelo Student para ser usado com o ORM Sequelize, especificando os atributos e suas tipagens.
