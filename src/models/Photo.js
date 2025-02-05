import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";
export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ser vazio",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ser vazio",
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue("filename")}`;
          },
        },
      },

      {
        sequelize,
        tableName: "photos",
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: "student_id" }); // Aqui está sendo definido uma relação entre as tabelas photos e students, onde cada foto pertence a um único estudante. Isso é feito adicionando uma chave estrangeira student_id na tabela photos, que referencia a tabela students.
  }
}
