/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("photos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      originalname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      student_id: {
        //essa config está fazendo uma referencia
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "students", //aqui estou referenciando o ID da tabela aluno
          key: "id",
        },
        onDelete: "SET NULL", //CASCADE aqui faz com que quando a tabela pai é deletada, o conteúdo da tabela filho também é deletada. No caso essa é a tabela filho. Ou eu posso usar o SET NULL para quando a tabela pai for deletada a tabela filho ser setada como NULL. No caso eu vou deixar como SET NULL para seguir o curso, mas o bom é o CASCADE
        onUpdate: "CASCADE", //Isso aqui serve para, por exemplo, se o ID de alguem for atualizado, ele propagar essa atualização nos filhos para que ele não fique sem referencia.
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("photos");
  },
};
